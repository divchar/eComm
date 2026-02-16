import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getProduct } from "@/lib/directus";
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
		getProduct(productId).then((data) => {
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
	};

	return (
		<div className="container mx-auto p-8">
			<Link to="/products" className="text-blue-600 hover:underline mb-4 block">
				← Back to Products
			</Link>

			<Card className="p-8 max-w-2xl mx-auto">
				<h1 className="text-4xl font-bold mb-4">{product.name}</h1>

				<p className="text-3xl font-bold text-primary mb-4">
					${product.price}
				</p>

				<p className="text-lg text-muted-foreground mb-6">
					{product.description}
				</p>

				<p className="text-sm text-muted-foreground mb-6">
					Created: {new Date(product.date_created).toLocaleDateString()}
				</p>

				<div className="flex gap-4 items-center">
					<div className="flex flex-col gap-2">
						<label htmlFor="quantity" className="text-sm font-medium">
							Quantity
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

					<Button onClick={handleAddToCart} size="lg" className="mt-6">
						Add to Cart
					</Button>
				</div>
			</Card>
		</div>
	);
}
