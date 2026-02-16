import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getProductById } from "@/lib/directus";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/products/$productId")({
	component: ProductDetailsPage,
});

function ProductDetailsPage() {
	const { productId } = Route.useParams();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [quantity, setQuantity] = useState(1);
	const { addToCart } = useCart();

	useEffect(() => {
		getProductById(productId).then((data) => {
			setProduct(data);
			setLoading(false);
		});
	}, [productId]);

	if (loading) {
		return <div className="container mx-auto p-8">Loading...</div>;
	}

	if (!product) {
		return <div className="container mx-auto p-8">Product not found</div>;
	}

	const handleAddToCart = () => {
		addToCart(product, quantity);
		setQuantity(1);
	};

	return (
		<div className="container mx-auto p-8">
			<Link to="/products">
				<Button variant="outline" className="mb-6">
					← Back to Products
				</Button>
			</Link>

			<Card className="overflow-hidden">
				<div className="p-8">
					<h1 className="text-4xl font-bold mb-4">{product.name}</h1>
					<p className="text-lg text-muted-foreground mb-6">
						{product.description}
					</p>
					<p className="text-3xl font-bold mb-8">${product.price}</p>

					<div className="flex gap-4 items-center">
						<div className="flex gap-2 items-center">
							<label htmlFor="quantity" className="font-medium">
								Quantity:
							</label>
							<Input
								id="quantity"
								type="number"
								min="1"
								value={quantity}
								onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
								className="w-24"
							/>
						</div>
						<Button size="lg" onClick={handleAddToCart}>
							Add to Cart
						</Button>
					</div>
				</div>
			</Card>
		</div>
	);
}
