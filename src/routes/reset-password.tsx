import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, FormEvent } from "react";
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

export const Route = createFileRoute("/reset-password")({
	component: ResetPasswordPage,
	validateSearch: (search: Record<string, unknown>) => {
		return {
			token: search.token as string,
		};
	},
});

function ResetPasswordPage() {
	const navigate = useNavigate();
	const { resetPassword } = useAuth();
	const { token } = Route.useSearch();
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError("");
		setSuccess(false);

		// Validation
		if (!newPassword || !confirmPassword) {
			setError("Please fill in all fields");
			return;
		}

		if (newPassword.length < 8) {
			setError("Password must be at least 8 characters long");
			return;
		}

		if (newPassword !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		if (!token) {
			setError("Invalid reset link. Please request a new password reset.");
			return;
		}

		setIsSubmitting(true);

		try {
			await resetPassword(token, newPassword);
			setSuccess(true);
		} catch (err: any) {
			setError(
				err?.message ||
					"Failed to reset password. The link may be expired. Please try again.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Reset Password</CardTitle>
					<CardDescription>Enter your new password below</CardDescription>
				</CardHeader>
				<CardContent>
					{success ? (
						<div className="space-y-4">
							<div className="p-4 text-sm text-green-700 bg-green-50 rounded-md border border-green-200">
								<p className="font-medium mb-1">Password reset successful!</p>
								<p>You can now log in with your new password.</p>
							</div>
							<Button
								className="w-full"
								onClick={() => navigate({ to: "/login" })}
							>
								Go to Login
							</Button>
						</div>
					) : (
						<form onSubmit={handleSubmit} className="space-y-4">
							{error && (
								<div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
									{error}
								</div>
							)}
							<div className="space-y-2">
								<label htmlFor="newPassword" className="text-sm font-medium">
									New Password
								</label>
								<Input
									id="newPassword"
									type="password"
									placeholder="••••••••"
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
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
								{isSubmitting ? "Resetting..." : "Reset Password"}
							</Button>
						</form>
					)}
				</CardContent>
				{!success && (
					<CardFooter>
						<div className="text-sm text-center text-gray-600 w-full">
							<Link to="/login" className="text-cyan-600 hover:underline">
								Back to login
							</Link>
						</div>
					</CardFooter>
				)}
			</Card>
		</div>
	);
}
