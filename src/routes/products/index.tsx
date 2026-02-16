import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { getProducts } from "@/lib/directus";
import type { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/products/")({
	component: ProductsPage,
});

function ProductsPage() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [quantities, setQuantities] = useState<Record<string, number>>({});
	const { addToCart } = useCart();

	useEffect(() => {
		getProducts()
			.then((data) => {
				setProducts(data as Product[]);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message || "Failed to load products");
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <div className="container mx-auto p-8">Loading...</div>;
	}

	if (error) {
		return <div className="container mx-auto p-8">Error: {error}</div>;
	}

	const handleAddToCart = (product: Product) => {
		const quantity = quantities[product.id] || 1;
		addToCart(product, quantity);
		setQuantities({ ...quantities, [product.id]: 1 });
	}

	return (
		<div className="container mx-auto p-8">
			<h1 className="text-4xl font-bold mb-8">Our Products</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{products.map((product) => (
					<Card key={product.id} className="overflow-hidden flex flex-col">
						<div className="p-6 flex-1 flex flex-col">
							<Link to="/products/$productId" params={{ productId: product.id }}>
								<h2 className="text-xl font-bold mb-2 hover:text-blue-600 cursor-pointer">
									{product.name}
								</h2>
							</Link>
							<p className="text-sm text-muted-foreground mb-4 flex-1">
								{product.description}
							</p>
							<p className="text-2xl font-bold mb-4">${product.price}</p>

							<div className="flex gap-2">
								<Input
									type="number"
									min="1"
									placeholder="Qty"
									value={quantities[product.id] || 1}
									onChange={(e) =>
										setQuantities({
											...quantities,
											[product.id]: parseInt(e.target.value) || 1,
										})
									}
									className="w-20"
								/>
								<Button
									className="flex-1"
									onClick={() => handleAddToCart(product)}
								>
									Add to Cart
								</Button>
							</div>
						</div>
					</Card>
				))}
			</div>
		</div>
	)
}
