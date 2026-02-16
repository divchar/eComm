import { createFileRoute } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import type { CheckoutFormData, OrderSummary } from "@/types";

const TAX_RATE = 0.1; // 10% tax
const SHIPPING_COST = 10.0;

export const Route = createFileRoute("/checkout")({
	component: CheckoutPage,
});

function CheckoutPage() {
	const { cart, getTotalPrice } = useCart();

	const [formData, setFormData] = useState<CheckoutFormData>({
		firstName: "",
		lastName: "",
		email: "",
		address: "",
		city: "",
		state: "",
		zipCode: "",
		cardNumber: "",
	});

	const subtotal = getTotalPrice();
	const tax = subtotal * TAX_RATE;
	const shipping = SHIPPING_COST;
	const grandTotal = subtotal + tax + shipping;

	const orderSummary: OrderSummary = {
		subtotal,
		tax,
		shipping,
		grandTotal,
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle checkout submission
		alert("Order placed successfully!");
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	if (cart.items.length === 0) {
		return (
			<div className="container mx-auto p-8">
				<h1 className="text-4xl font-bold mb-8">Checkout</h1>
				<p className="text-muted-foreground mb-4">Your cart is empty</p>
				<Link to="/products">
					<Button>Continue Shopping</Button>
				</Link>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-8">
			<h1 className="text-4xl font-bold mb-8">Checkout</h1>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<div className="lg:col-span-2">
					<Card className="p-6">
						<h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium mb-2">
										First Name
									</label>
									<Input
										name="firstName"
										value={formData.firstName}
										onChange={handleInputChange}
										required
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">
										Last Name
									</label>
									<Input
										name="lastName"
										value={formData.lastName}
										onChange={handleInputChange}
										required
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">Email</label>
								<Input
									name="email"
									type="email"
									value={formData.email}
									onChange={handleInputChange}
									required
								/>
							</div>

							<div>
								<label className="block text-sm font-medium mb-2">
									Address
								</label>
								<Input
									name="address"
									value={formData.address}
									onChange={handleInputChange}
									required
								/>
							</div>

							<div className="grid grid-cols-3 gap-4">
								<div>
									<label className="block text-sm font-medium mb-2">City</label>
									<Input
										name="city"
										value={formData.city}
										onChange={handleInputChange}
										required
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">
										State
									</label>
									<Input
										name="state"
										value={formData.state}
										onChange={handleInputChange}
										required
									/>
								</div>
								<div>
									<label className="block text-sm font-medium mb-2">
										Zip Code
									</label>
									<Input
										name="zipCode"
										value={formData.zipCode}
										onChange={handleInputChange}
										pattern="[0-9]{5}"
										placeholder="12345"
										required
									/>
								</div>
							</div>

							<h2 className="text-2xl font-bold mb-6 pt-6">
								Payment Information
							</h2>

							<div>
								<label className="block text-sm font-medium mb-2">
									Card Number
								</label>
								<Input
									name="cardNumber"
									type="text"
									value={formData.cardNumber}
									onChange={handleInputChange}
									placeholder="1234 5678 9012 3456"
									pattern="[0-9]{13,19}"
									maxLength={19}
									required
								/>
							</div>

							<Button type="submit" className="w-full mt-6" size="lg">
								Place Order - ${orderSummary.grandTotal.toFixed(2)}
							</Button>
						</form>
					</Card>
				</div>

				<div className="lg:col-span-1">
					<Card className="p-6">
						<h2 className="text-2xl font-bold mb-6">Order Summary</h2>

						<div className="space-y-4 mb-6">
							{cart.items.map((item) => (
								<div key={item.product.id} className="flex justify-between">
									<div>
										<p className="font-medium">{item.product.name}</p>
										<p className="text-sm text-muted-foreground">
											Qty: {item.quantity}
										</p>
									</div>
									<p className="font-medium">
										${(item.product.price * item.quantity).toFixed(2)}
									</p>
								</div>
							))}
						</div>

						<div className="border-t pt-4 space-y-2">
							<div className="flex justify-between">
								<p>Subtotal:</p>
								<p>${orderSummary.subtotal.toFixed(2)}</p>
							</div>
							<div className="flex justify-between">
								<p>Tax:</p>
								<p>${orderSummary.tax.toFixed(2)}</p>
							</div>
							<div className="flex justify-between">
								<p>Shipping:</p>
								<p>${orderSummary.shipping.toFixed(2)}</p>
							</div>
							<div className="flex justify-between font-bold text-lg border-t pt-2">
								<p>Total:</p>
								<p>${orderSummary.grandTotal.toFixed(2)}</p>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
