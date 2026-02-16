import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Route = createFileRoute("/checkout")({
	component: CheckoutPage,
});

interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	address: string;
	city: string;
	state: string;
	zipCode: string;
	cardNumber: string;
}

interface FormErrors {
	firstName?: string;
	lastName?: string;
	email?: string;
	address?: string;
	city?: string;
	state?: string;
	zipCode?: string;
	cardNumber?: string;
}

function CheckoutPage() {
	const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
	const navigate = useNavigate();
	const [formData, setFormData] = useState<FormData>({
		firstName: "",
		lastName: "",
		email: "",
		address: "",
		city: "",
		state: "",
		zipCode: "",
		cardNumber: "",
	});
	const [errors, setErrors] = useState<FormErrors>({});

	if (cart.items.length === 0) {
		return (
			<div className="container mx-auto p-8">
				<h1 className="text-4xl font-bold mb-8">Checkout</h1>
				<p className="text-muted-foreground mb-4">Your cart is empty</p>
				<Link to="/products">
					<Button>Back to Shopping</Button>
				</Link>
			</div>
		);
	}

	const subtotal = getTotalPrice();
	const tax = subtotal * 0.1;
	const shipping = subtotal >= 100 ? 0 : 10;
	const grandTotal = subtotal + tax + shipping;

	const validateForm = (): boolean => {
		const newErrors: FormErrors = {};

		if (!formData.firstName.trim()) {
			newErrors.firstName = "First name is required";
		}
		if (!formData.lastName.trim()) {
			newErrors.lastName = "Last name is required";
		}
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			newErrors.email = "Invalid email format";
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
		if (!formData.zipCode.trim()) {
			newErrors.zipCode = "ZIP code is required";
		} else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
			newErrors.zipCode = "Invalid ZIP code format";
		}
		if (!formData.cardNumber.trim()) {
			newErrors.cardNumber = "Card number is required";
		} else if (!/^\d{13,19}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
			newErrors.cardNumber = "Invalid card number";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleInputChange = (field: keyof FormData, value: string) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: undefined }));
		}
	};

	const handlePlaceOrder = (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			// Clear cart by removing all items
			cart.items.forEach((item) => {
				removeFromCart(item.product.id);
			});
			// Redirect to products page
			navigate({ to: "/products" });
		}
	};

	return (
		<div className="container mx-auto p-8">
			<h1 className="text-4xl font-bold mb-8">Checkout</h1>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Left column - Cart items and form */}
				<div className="lg:col-span-2 space-y-6">
					{/* Cart Items */}
					<Card className="p-6">
						<h2 className="text-2xl font-bold mb-4">Cart Items</h2>
						<div className="space-y-4">
							{cart.items.map((item) => (
								<div
									key={item.product.id}
									className="flex items-center gap-4 pb-4 border-b last:border-b-0 last:pb-0"
								>
									<div className="flex-1">
										<h3 className="font-bold">{item.product.name}</h3>
										<p className="text-sm text-muted-foreground">
											${item.product.price.toFixed(2)} each
										</p>
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
											size="default"
											onClick={() => removeFromCart(item.product.id)}
										>
											Remove
										</Button>
									</div>
								</div>
							))}
						</div>
					</Card>

					{/* Shipping & Billing Form */}
					<Card className="p-6">
						<h2 className="text-2xl font-bold mb-4">Shipping & Billing</h2>
						<form onSubmit={handlePlaceOrder}>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium mb-1">
										First Name *
									</label>
									<Input
										type="text"
										value={formData.firstName}
										onChange={(e) =>
											handleInputChange("firstName", e.target.value)
										}
										aria-invalid={!!errors.firstName}
									/>
									{errors.firstName && (
										<p className="text-sm text-destructive mt-1">
											{errors.firstName}
										</p>
									)}
								</div>
								<div>
									<label className="block text-sm font-medium mb-1">
										Last Name *
									</label>
									<Input
										type="text"
										value={formData.lastName}
										onChange={(e) => handleInputChange("lastName", e.target.value)}
										aria-invalid={!!errors.lastName}
									/>
									{errors.lastName && (
										<p className="text-sm text-destructive mt-1">
											{errors.lastName}
										</p>
									)}
								</div>
							</div>

							<div className="mt-4">
								<label className="block text-sm font-medium mb-1">Email *</label>
								<Input
									type="email"
									value={formData.email}
									onChange={(e) => handleInputChange("email", e.target.value)}
									aria-invalid={!!errors.email}
								/>
								{errors.email && (
									<p className="text-sm text-destructive mt-1">{errors.email}</p>
								)}
							</div>

							<div className="mt-4">
								<label className="block text-sm font-medium mb-1">
									Address *
								</label>
								<Input
									type="text"
									value={formData.address}
									onChange={(e) => handleInputChange("address", e.target.value)}
									aria-invalid={!!errors.address}
								/>
								{errors.address && (
									<p className="text-sm text-destructive mt-1">
										{errors.address}
									</p>
								)}
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
								<div>
									<label className="block text-sm font-medium mb-1">City *</label>
									<Input
										type="text"
										value={formData.city}
										onChange={(e) => handleInputChange("city", e.target.value)}
										aria-invalid={!!errors.city}
									/>
									{errors.city && (
										<p className="text-sm text-destructive mt-1">{errors.city}</p>
									)}
								</div>
								<div>
									<label className="block text-sm font-medium mb-1">
										State *
									</label>
									<Input
										type="text"
										value={formData.state}
										onChange={(e) => handleInputChange("state", e.target.value)}
										aria-invalid={!!errors.state}
									/>
									{errors.state && (
										<p className="text-sm text-destructive mt-1">
											{errors.state}
										</p>
									)}
								</div>
								<div>
									<label className="block text-sm font-medium mb-1">
										ZIP Code *
									</label>
									<Input
										type="text"
										value={formData.zipCode}
										onChange={(e) => handleInputChange("zipCode", e.target.value)}
										aria-invalid={!!errors.zipCode}
									/>
									{errors.zipCode && (
										<p className="text-sm text-destructive mt-1">
											{errors.zipCode}
										</p>
									)}
								</div>
							</div>
						</form>
					</Card>

					{/* Payment Section */}
					<Card className="p-6">
						<h2 className="text-2xl font-bold mb-4">Payment</h2>
						<div>
							<label className="block text-sm font-medium mb-1">
								Card Number *
							</label>
							<Input
								type="text"
								value={formData.cardNumber}
								onChange={(e) => handleInputChange("cardNumber", e.target.value)}
								placeholder="1234 5678 9012 3456"
								aria-invalid={!!errors.cardNumber}
							/>
							{errors.cardNumber && (
								<p className="text-sm text-destructive mt-1">
									{errors.cardNumber}
								</p>
							)}
						</div>
					</Card>
				</div>

				{/* Right column - Order Summary (sticky on desktop) */}
				<div className="lg:col-span-1">
					<Card className="p-6 lg:sticky lg:top-8">
						<h2 className="text-2xl font-bold mb-4">Order Summary</h2>

						<div className="space-y-2 mb-4">
							<div className="flex justify-between">
								<p className="text-muted-foreground">Subtotal</p>
								<p className="font-medium">${subtotal.toFixed(2)}</p>
							</div>
							<div className="flex justify-between">
								<p className="text-muted-foreground">Tax (10%)</p>
								<p className="font-medium">${tax.toFixed(2)}</p>
							</div>
							<div className="flex justify-between">
								<p className="text-muted-foreground">
									Shipping {subtotal >= 100 && "(Free)"}
								</p>
								<p className="font-medium">${shipping.toFixed(2)}</p>
							</div>
							{subtotal < 100 && (
								<p className="text-sm text-muted-foreground italic">
									Free shipping on orders over $100
								</p>
							)}
							<div className="border-t pt-2 mt-2">
								<div className="flex justify-between items-center">
									<p className="text-xl font-bold">Grand Total</p>
									<p className="text-2xl font-bold">${grandTotal.toFixed(2)}</p>
								</div>
							</div>
						</div>

						<Button
							className="w-full mb-4"
							size="lg"
							onClick={handlePlaceOrder}
						>
							Place Order
						</Button>

						<Link to="/products">
							<Button variant="outline" className="w-full">
								Back to Shopping
							</Button>
						</Link>
					</Card>
				</div>
			</div>
		</div>
	);
}
