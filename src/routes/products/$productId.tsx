import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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
	const navigate = useNavigate();

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
		return (
			<div className="container mx-auto p-8">
				<h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
				<p className="text-muted-foreground mb-4">
					The product you're looking for doesn't exist.
				</p>
				<Link to="/products">
					<Button>Back to Products</Button>
				</Link>
			</div>
		);
	}

	const handleAddToCart = () => {
		addToCart(product, quantity);
		navigate({ to: "/cart" });
	};

	return (
		<div className="container mx-auto p-8">
			<Link to="/products">
				<Button variant="outline" className="mb-6">
					← Back to Products
				</Button>
			</Link>

			<Card className="p-8">
				<h1 className="text-4xl font-bold mb-4">{product.name}</h1>
				<p className="text-3xl font-bold text-primary mb-4">
					${product.price.toFixed(2)}
				</p>
				<p className="text-muted-foreground mb-4">{product.description}</p>
				<p className="text-sm text-muted-foreground mb-6">
					Added: {new Date(product.date_created).toLocaleDateString()}
				</p>

				<div className="flex gap-4 items-center">
					<label htmlFor="quantity" className="font-semibold">
						Quantity:
					</label>
					<Input
						id="quantity"
						type="number"
						min="1"
						value={quantity}
						onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 1)}
						className="w-24"
					/>
					<Button onClick={handleAddToCart} size="lg">
						Add to Cart
					</Button>
				</div>
			</Card>
		</div>
	);
}
