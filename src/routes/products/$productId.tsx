import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
		getProductById(productId)
			.then((data) => {
				setProduct(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching product:", error);
				setLoading(false);
			});
	}, [productId]);

	if (loading) {
		return <div className="container mx-auto p-8">Loading...</div>;
	}

	if (!product) {
		return (
			<div className="container mx-auto p-8">
				<h1 className="text-4xl font-bold mb-8">Product Not Found</h1>
				<Button onClick={() => navigate({ to: "/products" })}>
					Back to Products
				</Button>
			</div>
		);
	}

	const handleAddToCart = () => {
		addToCart(product, quantity);
		navigate({ to: "/cart" });
	};

	return (
		<div className="container mx-auto p-8">
			<Button
				variant="outline"
				className="mb-6"
				onClick={() => navigate({ to: "/products" })}
			>
				← Back to Products
			</Button>

			<Card className="p-8">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div className="bg-muted rounded-lg flex items-center justify-center h-96">
						<p className="text-muted-foreground">Product Image</p>
					</div>

					<div className="flex flex-col">
						<h1 className="text-4xl font-bold mb-4">{product.name}</h1>
						<p className="text-3xl font-bold text-primary mb-6">
							${product.price.toFixed(2)}
						</p>
						<p className="text-lg text-muted-foreground mb-8">
							{product.description}
						</p>

						<div className="mt-auto">
							<div className="flex gap-4 mb-4">
								<div className="flex-1">
									<label className="block text-sm font-medium mb-2">
										Quantity
									</label>
									<Input
										type="number"
										min="1"
										value={quantity}
										onChange={(e) =>
											setQuantity(parseInt(e.target.value) || 1)
										}
										className="w-full"
									/>
								</div>
							</div>

							<Button onClick={handleAddToCart} size="lg" className="w-full">
								Add to Cart
							</Button>
						</div>
					</div>
				</div>

				<div className="mt-8 pt-8 border-t">
					<h2 className="text-2xl font-bold mb-4">Product Details</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<p className="text-sm text-muted-foreground">Product ID</p>
							<p className="font-medium">{product.id}</p>
						</div>
						<div>
							<p className="text-sm text-muted-foreground">Date Added</p>
							<p className="font-medium">
								{new Date(product.date_created).toLocaleDateString()}
							</p>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}
