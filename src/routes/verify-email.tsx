import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";

export const Route = createFileRoute("/verify-email")({
	component: VerifyEmailPage,
	validateSearch: (search: Record<string, unknown>) => {
		return {
			token: search.token as string,
		};
	},
});

function VerifyEmailPage() {
	const { verifyEmail } = useAuth();
	const { token } = Route.useSearch();
	const [isVerifying, setIsVerifying] = useState(true);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		const verify = async () => {
			if (!token) {
				setError("Invalid verification link. No token provided.");
				setIsVerifying(false);
				return;
			}

			try {
				await verifyEmail(token);
				setSuccess(true);
			} catch (err: any) {
				setError(
					err?.message ||
						"Email verification failed. The link may be expired or invalid.",
				);
			} finally {
				setIsVerifying(false);
			}
		};

		verify();
	}, [token, verifyEmail]);

	return (
		<div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-2xl">Email Verification</CardTitle>
					<CardDescription>
						{isVerifying
							? "Verifying your email address..."
							: success
								? "Your email has been verified"
								: "Verification failed"}
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					{isVerifying && (
						<div className="flex justify-center items-center py-8">
							<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
						</div>
					)}

					{!isVerifying && success && (
						<>
							<div className="p-4 text-sm text-green-700 bg-green-50 rounded-md border border-green-200">
								<p className="font-medium mb-1">Success!</p>
								<p>Your email has been verified. You can now log in.</p>
							</div>
							<Link to="/login">
								<Button className="w-full">Go to Login</Button>
							</Link>
						</>
					)}

					{!isVerifying && error && (
						<>
							<div className="p-4 text-sm text-red-600 bg-red-50 rounded-md border border-red-200">
								<p className="font-medium mb-1">Verification Failed</p>
								<p>{error}</p>
							</div>
							<Link to="/login">
								<Button variant="outline" className="w-full">
									Back to Login
								</Button>
							</Link>
						</>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
