import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { CheckoutFormData, OrderSummary } from "@/types";

export const Route = createFileRoute("/checkout")({
	component: CheckoutPage,
});

function CheckoutPage() {
	const { cart, clearCart, getTotalPrice } = useCart();
	const navigate = useNavigate();

	const [formData, setFormData] = useState<CheckoutFormData>({
		customerName: "",
		email: "",
		shippingAddress: "",
	});

	const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});

	if (cart.items.length === 0) {
		return (
			<div className="container mx-auto p-8">
				<h1 className="text-4xl font-bold mb-8">Checkout</h1>
				<p className="text-muted-foreground mb-4">
					Your cart is empty. Please add items to your cart before checking out.
				</p>
				<Link to="/products">
					<Button>Back to Products</Button>
				</Link>
			</div>
		);
	}

	const calculateOrderSummary = (): OrderSummary => {
		const subtotal = getTotalPrice();
		const tax = subtotal * 0.1;
		const shipping = subtotal > 100 ? 0 : 10;
		const total = subtotal + tax + shipping;
		return { subtotal, tax, shipping, total };
	};

	const orderSummary = calculateOrderSummary();

	const validateForm = (): boolean => {
		const newErrors: Partial<CheckoutFormData> = {};
		
		if (!formData.customerName.trim()) {
			newErrors.customerName = "Customer name is required";
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!emailRegex.test(formData.email)) {
			newErrors.email = "Please enter a valid email address";
		}

		if (!formData.shippingAddress.trim()) {
			newErrors.shippingAddress = "Shipping address is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		
		if (validateForm()) {
			clearCart();
			navigate({ to: "/products" });
		}
	};

	const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
		setFormData({ ...formData, [field]: value });
		if (errors[field]) {
			setErrors({ ...errors, [field]: undefined });
		}
	};

	return (
		<div className="container mx-auto p-8">
			<h1 className="text-4xl font-bold mb-8">Checkout</h1>
			
			<Link to="/products">
				<Button variant="outline" className="mb-6">
					← Back to Shopping
				</Button>
			</Link>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Left Column - Order Summary */}
				<div>
					<h2 className="text-2xl font-bold mb-4">Order Summary</h2>
					
					<div className="space-y-4 mb-6">
						{cart.items.map((item) => (
							<Card key={item.product.id} className="p-4">
								<div className="flex justify-between items-start">
									<div>
										<h3 className="font-bold">{item.product.name}</h3>
										<p className="text-sm text-muted-foreground">
											${item.product.price.toFixed(2)} × {item.quantity}
										</p>
									</div>
									<p className="font-bold">
										${(item.product.price * item.quantity).toFixed(2)}
									</p>
								</div>
							</Card>
						))}
					</div>

					<Card className="p-6 bg-muted">
						<div className="space-y-2">
							<div className="flex justify-between">
								<span>Subtotal:</span>
								<span>${orderSummary.subtotal.toFixed(2)}</span>
							</div>
							<div className="flex justify-between">
								<span>Tax (10%):</span>
								<span>${orderSummary.tax.toFixed(2)}</span>
							</div>
							<div className="flex justify-between">
								<span>Shipping:</span>
								<span>
									{orderSummary.shipping === 0 
										? "FREE" 
										: `$${orderSummary.shipping.toFixed(2)}`}
								</span>
							</div>
							<div className="border-t pt-2 flex justify-between text-xl font-bold">
								<span>Total:</span>
								<span>${orderSummary.total.toFixed(2)}</span>
							</div>
						</div>
					</Card>
				</div>

				{/* Right Column - Customer Information Form */}
				<div>
					<h2 className="text-2xl font-bold mb-4">Customer Information</h2>
					
					<form onSubmit={handleSubmit}>
						<Card className="p-6">
							<div className="space-y-4">
								<div>
									<label htmlFor="customerName" className="block font-semibold mb-2">
										Full Name *
									</label>
									<Input
										id="customerName"
										type="text"
										value={formData.customerName}
										onChange={(e) => handleInputChange("customerName", e.target.value)}
										aria-invalid={!!errors.customerName}
										aria-describedby={errors.customerName ? "customerName-error" : undefined}
										className={errors.customerName ? "border-red-500" : ""}
									/>
									{errors.customerName && (
										<p id="customerName-error" className="text-red-500 text-sm mt-1">
											{errors.customerName}
										</p>
									)}
								</div>

								<div>
									<label htmlFor="email" className="block font-semibold mb-2">
										Email Address *
									</label>
									<Input
										id="email"
										type="email"
										value={formData.email}
										onChange={(e) => handleInputChange("email", e.target.value)}
										aria-invalid={!!errors.email}
										aria-describedby={errors.email ? "email-error" : undefined}
										className={errors.email ? "border-red-500" : ""}
									/>
									{errors.email && (
										<p id="email-error" className="text-red-500 text-sm mt-1">
											{errors.email}
										</p>
									)}
								</div>

								<div>
									<label htmlFor="shippingAddress" className="block font-semibold mb-2">
										Shipping Address *
									</label>
									<Input
										id="shippingAddress"
										type="text"
										value={formData.shippingAddress}
										onChange={(e) => handleInputChange("shippingAddress", e.target.value)}
										aria-invalid={!!errors.shippingAddress}
										aria-describedby={errors.shippingAddress ? "shippingAddress-error" : undefined}
										className={errors.shippingAddress ? "border-red-500" : ""}
									/>
									{errors.shippingAddress && (
										<p id="shippingAddress-error" className="text-red-500 text-sm mt-1">
											{errors.shippingAddress}
										</p>
									)}
								</div>

								<Button type="submit" className="w-full" size="lg">
									Place Order
								</Button>
							</div>
						</Card>
					</form>
				</div>
			</div>
		</div>
	);
}
