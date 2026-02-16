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

export const Route = createFileRoute("/register")({
	component: RegisterPage,
});

function RegisterPage() {
	const { register } = useAuth();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setSuccess(false);

		// Validation
		if (!email || !password || !confirmPassword) {
			setError("Email and password are required");
			return;
		}

		if (!email.includes("@")) {
			setError("Please enter a valid email address");
			return;
		}

		if (password.length < 8) {
			setError("Password must be at least 8 characters long");
			return;
		}

		if (password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		setIsSubmitting(true);

		try {
			await register(
				email,
				password,
				firstName || undefined,
				lastName || undefined,
			);
			setSuccess(true);
			// Clear form
			setFirstName("");
			setLastName("");
			setEmail("");
			setPassword("");
			setConfirmPassword("");
		} catch (err: any) {
			setError(
				err?.message || "Registration failed. Please try again.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Create an Account</CardTitle>
					<CardDescription>
						Fill in the form below to create your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					{success ? (
						<div className="p-4 text-sm text-green-700 bg-green-50 rounded-md border border-green-200">
							<p className="font-medium mb-1">Registration successful!</p>
							<p>Please check your email for a verification link.</p>
						</div>
					) : (
						<form onSubmit={handleSubmit} className="space-y-4">
							{error && (
								<div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
									{error}
								</div>
							)}
							<div className="space-y-2">
								<label htmlFor="firstName" className="text-sm font-medium">
									First Name (Optional)
								</label>
								<Input
									id="firstName"
									type="text"
									placeholder="John"
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									disabled={isSubmitting}
								/>
							</div>
							<div className="space-y-2">
								<label htmlFor="lastName" className="text-sm font-medium">
									Last Name (Optional)
								</label>
								<Input
									id="lastName"
									type="text"
									placeholder="Doe"
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									disabled={isSubmitting}
								/>
							</div>
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
							<div className="space-y-2">
								<label
									htmlFor="confirmPassword"
									className="text-sm font-medium"
								>
									Confirm Password
								</label>
								<Input
									id="confirmPassword"
									type="password"
									placeholder="••••••••"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									required
									disabled={isSubmitting}
								/>
							</div>
							<Button type="submit" className="w-full" disabled={isSubmitting}>
								{isSubmitting ? "Registering..." : "Register"}
							</Button>
						</form>
					)}
				</CardContent>
				<CardFooter>
					<div className="text-sm text-center text-gray-600 w-full">
						Already have an account?{" "}
						<Link to="/login" className="text-cyan-600 hover:underline">
							Login here
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
