import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
	component: ContactPage,
});

function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
		setFormData({ name: "", email: "", message: "" });
		alert("Thank you for contacting us!");
	};

	return (
		<div className="container mx-auto p-8 max-w-2xl">
			<h1 className="text-4xl font-bold mb-8">Contact Us</h1>

			<Card className="p-8">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="name" className="block text-sm font-medium mb-2">
							Name
						</label>
						<Input
							type="text"
							placeholder="Your name"
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
							required
						/>
					</div>

					<div>
						<label htmlFor="email" className="block text-sm font-medium mb-2">
							Email
						</label>
						<Input
							type="email"
							placeholder="your@email.com"
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							required
						/>
					</div>

					<div>
						<label htmlFor="message" className="block text-sm font-medium mb-2">
							Message
						</label>
						<textarea
							placeholder="Your message"
							value={formData.message}
							onChange={(e) =>
								setFormData({ ...formData, message: e.target.value })
							}
							required
							className="w-full border rounded-md p-2 min-h-32"
						/>
					</div>

					<Button type="submit" className="w-full">
						Send Message
					</Button>
				</form>
			</Card>
		</div>
	);
}
