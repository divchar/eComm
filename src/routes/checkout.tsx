import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import type { CheckoutFormData, OrderSummary } from "@/types";

export const Route = createFileRoute("/checkout")({
	component: CheckoutPage,
});

function CheckoutPage() {
	const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
	const navigate = useNavigate();
	const [formData, setFormData] = useState<CheckoutFormData>({
		firstName: "",
		lastName: "",
		email: "",
		address: "",
		city: "",
		state: "",
		zip: "",
		cardNumber: "",
	});
	const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});

	// Calculate order summary
	const calculateOrderSummary = (): OrderSummary => {
		const subtotal = getTotalPrice();
		const tax = subtotal * 0.1; // 10% tax
		const shipping = subtotal >= 100 ? 0 : 10; // Free shipping over $100
		const total = subtotal + tax + shipping;

		return { subtotal, tax, shipping, total };
	};

	const orderSummary = calculateOrderSummary();

	// Form validation
	const validateForm = (): boolean => {
		const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

		if (!formData.firstName.trim()) {
			newErrors.firstName = "First name is required";
		}
		if (!formData.lastName.trim()) {
			newErrors.lastName = "Last name is required";
		}
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
		}
		if (!formData.address.trim()) {
			newErrors.address = "Address is required";
		}
		if (!formData.city.trim()) {
			newErrors.city = "City is required";
		}
		if (!formData.state.trim()) {
			newErrors.state = "State is required";
		}
		if (!formData.zip.trim()) {
			newErrors.zip = "ZIP code is required";
		} else if (!/^\d{5}(-\d{4})?$/.test(formData.zip)) {
			newErrors.zip = "ZIP code is invalid";
		}
		if (!formData.cardNumber.trim()) {
			newErrors.cardNumber = "Card number is required";
		} else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
			newErrors.cardNumber = "Card number must be 16 digits";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// Clear error for this field when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: undefined }));
		}
	};

	const handlePlaceOrder = (e: React.FormEvent) => {
		e.preventDefault();
		
		if (validateForm()) {
			// In a real app, this would send the order to a backend
			alert(`Order placed successfully! Total: $${orderSummary.total.toFixed(2)}`);
			navigate({ to: "/products" });
		}
	};

	// Empty cart state
	if (cart.items.length === 0) {
		return (
			<div className="container mx-auto p-8">
				<h1 className="text-4xl font-bold mb-8">Checkout</h1>
				<Card className="p-8 text-center">
					<p className="text-muted-foreground mb-4">Your cart is empty</p>
					<Link to="/products">
						<Button>Back to Shopping</Button>
					</Link>
				</Card>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-8">
			<h1 className="text-4xl font-bold mb-8">Checkout</h1>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Left column: Cart items and form */}
				<div className="lg:col-span-2 space-y-8">
					{/* Cart Items Review */}
					<div>
						<h2 className="text-2xl font-bold mb-4">Review Your Items</h2>
						<div className="space-y-4">
							{cart.items.map((item) => (
								<Card key={item.product.id} className="p-4 flex items-center gap-4">
									<div className="flex-1">
										<h3 className="font-bold">{item.product.name}</h3>
										<p className="text-sm text-muted-foreground">
											${item.product.price.toFixed(2)}
										</p>
									</div>
									<div className="flex items-center gap-2">
										<Input
											type="number"
											min="1"
											value={item.quantity}
											onChange={(e) =>
												updateQuantity(item.product.id, parseInt(e.target.value) || 1)
											}
											className="w-16 h-8 text-sm"
										/>
										<p className="font-bold w-20 text-right">
											${(item.product.price * item.quantity).toFixed(2)}
										</p>
										<Button
											variant="destructive"
											size="sm"
											onClick={() => removeFromCart(item.product.id)}
										>
											Remove
										</Button>
									</div>
								</Card>
							))}
						</div>
					</div>

					{/* Shipping & Billing Form */}
					<form onSubmit={handlePlaceOrder}>
						<h2 className="text-2xl font-bold mb-4">Shipping & Billing</h2>
						<Card className="p-6">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label htmlFor="firstName" className="block text-sm font-medium mb-1">
										First Name
									</label>
									<Input
										id="firstName"
										type="text"
										value={formData.firstName}
										onChange={(e) => handleInputChange("firstName", e.target.value)}
										className={errors.firstName ? "border-red-500" : ""}
									/>
									{errors.firstName && (
										<p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
									)}
								</div>

								<div>
									<label htmlFor="lastName" className="block text-sm font-medium mb-1">
										Last Name
									</label>
									<Input
										id="lastName"
										type="text"
										value={formData.lastName}
										onChange={(e) => handleInputChange("lastName", e.target.value)}
										className={errors.lastName ? "border-red-500" : ""}
									/>
									{errors.lastName && (
										<p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
									)}
								</div>

								<div className="md:col-span-2">
									<label htmlFor="email" className="block text-sm font-medium mb-1">
										Email
									</label>
									<Input
										id="email"
										type="email"
										value={formData.email}
										onChange={(e) => handleInputChange("email", e.target.value)}
										className={errors.email ? "border-red-500" : ""}
									/>
									{errors.email && (
										<p className="text-red-500 text-xs mt-1">{errors.email}</p>
									)}
								</div>

								<div className="md:col-span-2">
									<label htmlFor="address" className="block text-sm font-medium mb-1">
										Address
									</label>
									<Input
										id="address"
										type="text"
										value={formData.address}
										onChange={(e) => handleInputChange("address", e.target.value)}
										className={errors.address ? "border-red-500" : ""}
									/>
									{errors.address && (
										<p className="text-red-500 text-xs mt-1">{errors.address}</p>
									)}
								</div>

								<div>
									<label htmlFor="city" className="block text-sm font-medium mb-1">
										City
									</label>
									<Input
										id="city"
										type="text"
										value={formData.city}
										onChange={(e) => handleInputChange("city", e.target.value)}
										className={errors.city ? "border-red-500" : ""}
									/>
									{errors.city && (
										<p className="text-red-500 text-xs mt-1">{errors.city}</p>
									)}
								</div>

								<div>
									<label htmlFor="state" className="block text-sm font-medium mb-1">
										State
									</label>
									<Input
										id="state"
										type="text"
										value={formData.state}
										onChange={(e) => handleInputChange("state", e.target.value)}
										className={errors.state ? "border-red-500" : ""}
									/>
									{errors.state && (
										<p className="text-red-500 text-xs mt-1">{errors.state}</p>
									)}
								</div>

								<div className="md:col-span-2">
									<label htmlFor="zip" className="block text-sm font-medium mb-1">
										ZIP Code
									</label>
									<Input
										id="zip"
										type="text"
										value={formData.zip}
										onChange={(e) => handleInputChange("zip", e.target.value)}
										className={errors.zip ? "border-red-500" : ""}
									/>
									{errors.zip && (
										<p className="text-red-500 text-xs mt-1">{errors.zip}</p>
									)}
								</div>

								<div className="md:col-span-2">
									<label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
										Card Number
									</label>
									<Input
										id="cardNumber"
										type="text"
										value={formData.cardNumber}
										onChange={(e) => handleInputChange("cardNumber", e.target.value)}
										className={errors.cardNumber ? "border-red-500" : ""}
										placeholder="1234567890123456"
									/>
									{errors.cardNumber && (
										<p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
									)}
								</div>
							</div>
						</Card>
					</form>
				</div>

				{/* Right column: Order Summary (sticky) */}
				<div className="lg:col-span-1">
					<div className="sticky top-8">
						<h2 className="text-2xl font-bold mb-4">Order Summary</h2>
						<Card className="p-6">
							<div className="space-y-4">
								<div className="flex justify-between">
									<span className="text-muted-foreground">Subtotal</span>
									<span className="font-medium">
										${orderSummary.subtotal.toFixed(2)}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Tax (10%)</span>
									<span className="font-medium">
										${orderSummary.tax.toFixed(2)}
									</span>
								</div>
								<div className="flex justify-between">
									<span className="text-muted-foreground">Shipping</span>
									<span className="font-medium">
										{orderSummary.shipping === 0 ? (
											<span className="text-green-600">FREE</span>
										) : (
											`$${orderSummary.shipping.toFixed(2)}`
										)}
									</span>
								</div>
								{orderSummary.subtotal < 100 && orderSummary.subtotal > 0 && (
									<p className="text-xs text-muted-foreground">
										Add ${(100 - orderSummary.subtotal).toFixed(2)} more for free shipping
									</p>
								)}
								<div className="border-t pt-4">
									<div className="flex justify-between items-center">
										<span className="text-lg font-bold">Total</span>
										<span className="text-2xl font-bold">
											${orderSummary.total.toFixed(2)}
										</span>
									</div>
								</div>
							</div>

							<Button
								type="submit"
								className="w-full mt-6"
								size="lg"
								onClick={handlePlaceOrder}
							>
								Place Order
							</Button>

							<Link to="/cart">
								<Button variant="outline" className="w-full mt-4">
									Back to Cart
								</Button>
							</Link>
						</Card>
					</div>
				</div>
			</div>
		</div>
	);
}
