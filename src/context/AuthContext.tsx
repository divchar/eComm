import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";
import { directus } from "@/lib/directus";
import {
	readMe,
	registerUser,
	registerUserVerify,
	passwordRequest,
	passwordReset,
} from "@directus/sdk";
import type { DirectusUser } from "@/types";

interface AuthContextType {
	user: DirectusUser | null;
	isAuthenticated: boolean;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<void>;
	register: (
		email: string,
		password: string,
		firstName?: string,
		lastName?: string,
	) => Promise<void>;
	logout: () => Promise<void>;
	requestPasswordReset: (email: string) => Promise<void>;
	resetPassword: (token: string, newPassword: string) => Promise<void>;
	verifyEmail: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<DirectusUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// Check for existing session on mount
	useEffect(() => {
		const checkAuth = async () => {
			try {
				// Try to refresh the token and get current user
				await directus.refresh();
				const currentUser = await directus.request(readMe());
				setUser(currentUser as DirectusUser);
			} catch (error) {
				// No valid session
				setUser(null);
			} finally {
				setIsLoading(false);
			}
		};

		checkAuth();
	}, []);

	const login = async (email: string, password: string) => {
		try {
			await directus.login(email, password);
			const currentUser = await directus.request(readMe());
			setUser(currentUser as DirectusUser);
		} catch (error) {
			console.error("Login failed:", error);
			throw error;
		}
	};

	const register = async (
		email: string,
		password: string,
		firstName?: string,
		lastName?: string,
	) => {
		try {
			await directus.request(
				registerUser({
					email,
					password,
					first_name: firstName,
					last_name: lastName,
				}),
			);
		} catch (error) {
			console.error("Registration failed:", error);
			throw error;
		}
	};

	const logout = async () => {
		try {
			await directus.logout();
			setUser(null);
		} catch (error) {
			console.error("Logout failed:", error);
			throw error;
		}
	};

	const requestPasswordReset = async (email: string) => {
		try {
			const resetUrl = typeof window !== "undefined" 
				? `${window.location.origin}/reset-password`
				: "http://localhost:3000/reset-password";
			await directus.request(passwordRequest(email, resetUrl));
		} catch (error) {
			console.error("Password reset request failed:", error);
			throw error;
		}
	};

	const resetPassword = async (token: string, newPassword: string) => {
		try {
			await directus.request(passwordReset(token, newPassword));
		} catch (error) {
			console.error("Password reset failed:", error);
			throw error;
		}
	};

	const verifyEmail = async (token: string) => {
		try {
			await directus.request(registerUserVerify(token));
		} catch (error) {
			console.error("Email verification failed:", error);
			throw error;
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isAuthenticated: !!user,
				isLoading,
				login,
				register,
				logout,
				requestPasswordReset,
				resetPassword,
				verifyEmail,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return context;
}
