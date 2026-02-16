import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
	CardFooter,
} from "@/components/ui/card";

export const Route = createFileRoute("/login")({
	component: LoginPage,
});

function LoginPage() {
	const navigate = useNavigate();
	const { login } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");

		// Validation
		if (!email || !password) {
			setError("Please fill in all fields");
			return;
		}

		if (!email.includes("@") || !email.includes(".") || email.indexOf("@") > email.lastIndexOf(".")) {
			setError("Please enter a valid email address");
			return;
		}

		setIsSubmitting(true);

		try {
			await login(email, password);
			navigate({ to: "/products" });
		} catch (err) {
			setError("Invalid email or password. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email and password to access your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						{error && (
							<div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
								{error}
							</div>
						)}
						<div className="space-y-2">
							<label htmlFor="email" className="text-sm font-medium">
								Email
							</label>
							<Input
								id="email"
								type="email"
								placeholder="you@example.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								disabled={isSubmitting}
							/>
						</div>
						<div className="space-y-2">
							<label htmlFor="password" className="text-sm font-medium">
								Password
							</label>
							<Input
								id="password"
								type="password"
								placeholder="••••••••"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								disabled={isSubmitting}
							/>
						</div>
						<Button type="submit" className="w-full" disabled={isSubmitting}>
							{isSubmitting ? "Logging in..." : "Login"}
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex flex-col gap-2">
					<div className="text-sm text-center text-gray-600">
						<Link
							to="/forgot-password"
							className="text-cyan-600 hover:underline"
						>
							Forgot password?
						</Link>
					</div>
					<div className="text-sm text-center text-gray-600">
						Don't have an account?{" "}
						<Link to="/register" className="text-cyan-600 hover:underline">
							Register here
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
