import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({
	component: HomePage,
});

function HomePage() {
	return (
		<div className="container mx-auto p-8">
			<div className="text-center mb-16">
				<h1 className="text-5xl font-bold mb-4">Welcome to My Store</h1>
				<p className="text-xl text-muted-foreground mb-8">
					Discover amazing products at great prices
				</p>
				<Link to="/products">
					<Button size="lg" className="text-lg px-8">
						Start Shopping
					</Button>
				</Link>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
				<Card className="p-8 text-center">
					<div className="text-4xl mb-4">🚚</div>
					<h2 className="text-xl font-bold mb-2">Fast Shipping</h2>
					<p className="text-muted-foreground">
						Get your orders delivered quickly and safely
					</p>
				</Card>

				<Card className="p-8 text-center">
					<div className="text-4xl mb-4">💳</div>
					<h2 className="text-xl font-bold mb-2">Secure Payment</h2>
					<p className="text-muted-foreground">
						Your payments are safe and secure with us
					</p>
				</Card>

				<Card className="p-8 text-center">
					<div className="text-4xl mb-4">⭐</div>
					<h2 className="text-xl font-bold mb-2">Quality Products</h2>
					<p className="text-muted-foreground">
						Only the best products from trusted brands
					</p>
				</Card>
			</div>
		</div>
	);
}
