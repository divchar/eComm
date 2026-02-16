import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";

export const Route = createFileRoute("/checkout")({
	component: CheckoutPage,
});

function CheckoutPage() {
	const { cart, getTotalPrice, clearCart } = useCart();
	const navigate = useNavigate();
	const [isProcessing, setIsProcessing] = useState(false);

	const handleCheckout = () => {
		setIsProcessing(true);
		// Simulate checkout process
		try {
			setTimeout(() => {
				clearCart();
				navigate({ to: "/products" });
			}, 1000);
		} catch (error) {
			console.error("Checkout failed:", error);
			setIsProcessing(false);
		}
	};

	if (cart.items.length === 0) {
		return (
			<div className="container mx-auto p-8">
				<h1 className="text-4xl font-bold mb-8">Checkout</h1>
				<p className="text-muted-foreground mb-4">Your cart is empty</p>
				<Button onClick={() => navigate({ to: "/products" })}>
					Continue Shopping
				</Button>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-8">
			<h1 className="text-4xl font-bold mb-8">Checkout</h1>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				<div>
					<Card className="p-6">
						<h2 className="text-2xl font-bold mb-4">Order Summary</h2>
						<div className="space-y-3">
							{cart.items.map((item) => (
								<div
									key={item.product.id}
									className="flex justify-between items-center border-b pb-2"
								>
									<div>
										<p className="font-medium">{item.product.name}</p>
										<p className="text-sm text-muted-foreground">
											Qty: {item.quantity} × ${item.product.price.toFixed(2)}
										</p>
									</div>
									<p className="font-bold">
										${(item.product.price * item.quantity).toFixed(2)}
									</p>
								</div>
							))}
						</div>
						<div className="mt-6 pt-4 border-t">
							<div className="flex justify-between items-center">
								<p className="text-xl font-bold">Total:</p>
								<p className="text-2xl font-bold">
									${getTotalPrice().toFixed(2)}
								</p>
							</div>
						</div>
					</Card>
				</div>

				<div>
					<Card className="p-6">
						<h2 className="text-2xl font-bold mb-4">Payment Information</h2>
						<p className="text-muted-foreground mb-6">
							This is a demo checkout. Click "Complete Order" to finalize your
							purchase.
						</p>
						<Button
							className="w-full"
							size="lg"
							onClick={handleCheckout}
							disabled={isProcessing}
						>
							{isProcessing ? "Processing..." : "Complete Order"}
						</Button>
					</Card>
				</div>
			</div>
		</div>
	);
}
