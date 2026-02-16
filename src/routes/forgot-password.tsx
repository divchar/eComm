import { createFileRoute, Link } from "@tanstack/react-router";
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

export const Route = createFileRoute("/forgot-password")({
	component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
	const { requestPasswordReset } = useAuth();
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setSuccess(false);

		// Validation
		if (!email) {
			setError("Please enter your email address");
			return;
		}

		if (!email.includes("@") || !email.includes(".") || email.indexOf("@") > email.lastIndexOf(".")) {
			setError("Please enter a valid email address");
			return;
		}

		setIsSubmitting(true);

		try {
			await requestPasswordReset(email);
			setSuccess(true);
		} catch (err: any) {
			setError(
				err?.message || "Failed to send reset email. Please try again.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Forgot Password</CardTitle>
					<CardDescription>
						Enter your email address and we'll send you instructions to reset
						your password
					</CardDescription>
				</CardHeader>
				<CardContent>
					{success ? (
						<div className="p-4 text-sm text-green-700 bg-green-50 rounded-md border border-green-200">
							<p className="font-medium mb-1">Email sent!</p>
							<p>Check your email for reset instructions.</p>
						</div>
					) : (
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
							<Button type="submit" className="w-full" disabled={isSubmitting}>
								{isSubmitting ? "Sending..." : "Send Reset Link"}
							</Button>
						</form>
					)}
				</CardContent>
				<CardFooter>
					<div className="text-sm text-center text-gray-600 w-full">
						Remember your password?{" "}
						<Link to="/login" className="text-cyan-600 hover:underline">
							Back to login
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
