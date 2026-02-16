import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/checkout")({
	component: CheckoutPage,
});

function CheckoutPage() {
	const { cart, getTotalPrice, clearCart } = useCart();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		address: "",
	});
	const [errors, setErrors] = useState({
		name: "",
		email: "",
		address: "",
	});

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

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
		// Clear error when user starts typing
		if (errors[name as keyof typeof errors]) {
			setErrors((prev) => ({ ...prev, [name]: "" }));
		}
	};

	const validateForm = () => {
		const newErrors = {
			name: "",
			email: "",
			address: "",
		};
		let isValid = true;

		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
			isValid = false;
		}

		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
			isValid = false;
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = "Email is invalid";
			isValid = false;
		}

		if (!formData.address.trim()) {
			newErrors.address = "Shipping address is required";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (validateForm()) {
			// Process checkout
			clearCart();
			// Redirect to products page
			navigate({ to: "/products" });
		}
	};

	return (
		<div className="container mx-auto p-8">
			<h1 className="text-4xl font-bold mb-8">Checkout</h1>

			<div className="grid md:grid-cols-2 gap-8">
				{/* Left side - Order Summary */}
				<div>
					<h2 className="text-2xl font-bold mb-4">Order Summary</h2>
					<div className="space-y-4">
						{cart.items.map((item) => (
							<Card key={item.product.id} className="p-4">
								<div className="flex justify-between items-start">
									<div>
										<h3 className="font-bold">{item.product.name}</h3>
										<p className="text-sm text-muted-foreground">
											Quantity: {item.quantity}
										</p>
									</div>
									<p className="font-bold">
										${(item.product.price * item.quantity).toFixed(2)}
									</p>
								</div>
							</Card>
						))}
					</div>

					<Card className="p-6 bg-muted mt-6">
						<div className="flex justify-between items-center">
							<p className="text-xl font-bold">Total:</p>
							<p className="text-2xl font-bold">${getTotalPrice().toFixed(2)}</p>
						</div>
					</Card>
				</div>

				{/* Right side - Payment Information */}
				<div>
					<Card className="p-6">
						<h2 className="text-2xl font-bold mb-6">Payment Information</h2>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label htmlFor="name" className="block text-sm font-medium mb-2">
									Customer Name *
								</label>
								<Input
									id="name"
									name="name"
									type="text"
									value={formData.name}
									onChange={handleInputChange}
									className={errors.name ? "border-destructive" : ""}
									aria-invalid={!!errors.name}
								/>
								{errors.name && (
									<p className="text-destructive text-sm mt-1">{errors.name}</p>
								)}
							</div>

							<div>
								<label htmlFor="email" className="block text-sm font-medium mb-2">
									Email *
								</label>
								<Input
									id="email"
									name="email"
									type="email"
									value={formData.email}
									onChange={handleInputChange}
									className={errors.email ? "border-destructive" : ""}
									aria-invalid={!!errors.email}
								/>
								{errors.email && (
									<p className="text-destructive text-sm mt-1">{errors.email}</p>
								)}
							</div>

							<div>
								<label
									htmlFor="address"
									className="block text-sm font-medium mb-2"
								>
									Shipping Address *
								</label>
								<Input
									id="address"
									name="address"
									type="text"
									value={formData.address}
									onChange={handleInputChange}
									className={errors.address ? "border-destructive" : ""}
									aria-invalid={!!errors.address}
								/>
								{errors.address && (
									<p className="text-destructive text-sm mt-1">
										{errors.address}
									</p>
								)}
							</div>

							<Button type="submit" className="w-full" size="lg">
								Complete Checkout
							</Button>
						</form>
					</Card>

					<Link to="/cart">
						<Button variant="outline" className="w-full mt-4">
							Back to Cart
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
