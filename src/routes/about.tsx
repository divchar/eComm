import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/about")({
	component: AboutPage,
});

function AboutPage() {
	return (
		<div className="container mx-auto p-8">
			<h1 className="text-4xl font-bold mb-8">About Us</h1>

			<Card className="p-8">
				<p className="text-lg text-muted-foreground mb-4">
					Welcome to My Store, your trusted online shopping destination.
				</p>
				<p className="text-lg text-muted-foreground mb-4">
					We are committed to providing high-quality products and excellent
					customer service.
				</p>
				<p className="text-lg text-muted-foreground">
					Founded in 2024, we've been helping customers find exactly what they
					need.
				</p>
			</Card>
		</div>
	);
}
