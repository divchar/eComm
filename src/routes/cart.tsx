import { createFileRoute } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/cart")({
	component: CartPage,
});

function CartPage() {
	const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

	if (cart.items.length === 0) {
		return (
			<div className="container mx-auto p-8">
				<h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>
				<p className="text-muted-foreground mb-4">Your cart is empty</p>
				<Link to="/products">
					<Button>Continue Shopping</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-8">
			<h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

			<div className="space-y-4 mb-8">
				{cart.items.map((item) => (
					<Card key={item.product.id} className="p-6 flex items-center gap-6">
						<div className="flex-1">
							<h2 className="text-xl font-bold">{item.product.name}</h2>
							<p className="text-muted-foreground">${item.product.price}</p>
						</div>

						<div className="flex items-center gap-2">
							<Input
								type="number"
								min="1"
								value={item.quantity}
								onChange={(e) =>
									updateQuantity(item.product.id, parseInt(e.target.value))
								}
								className="w-20"
							/>
							<p className="font-bold w-24 text-right">
								${(item.product.price * item.quantity).toFixed(2)}
							</p>
							<Button
								variant="destructive"
								onClick={() => removeFromCart(item.product.id)}
							>
								Remove
							</Button>
						</div>
					</Card>
				))}
			</div>

			<Card className="p-6 bg-muted">
				<div className="flex justify-between items-center mb-6">
					<p className="text-2xl font-bold">Total:</p>
					<p className="text-3xl font-bold">${getTotalPrice().toFixed(2)}</p>
				</div>
				<Link to="/checkout">
					<Button className="w-full mb-4" size="lg">
						Checkout
					</Button>
				</Link>
				<Link to="/products">
					<Button variant="outline" className="w-full">
						Continue Shopping
					</Button>
				</Link>
			</Card>
		</div>
	);
}
