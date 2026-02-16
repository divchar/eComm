import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Home, Menu, X, ShoppingCart, Search, LogOut, LogIn, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const { cart } = useCart();
	const { user, isAuthenticated, logout } = useAuth();
	const itemCount = cart.items.reduce(
		(total, item) => total + item.quantity,
		0,
	);

	const handleLogout = async () => {
		try {
			await logout();
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<>
			<header className="p-4 flex items-center justify-between bg-gray-800 text-white shadow-lg">
				{/* Mobile: Hamburger Menu */}
				<button
					type="button"
					onClick={() => setIsOpen(true)}
					className="md:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"
					aria-label="Open menu"
				>
					<Menu size={24} />
				</button>

				{/* Store Name/Logo */}
				<h1 className="text-xl font-semibold md:mr-8">
					<Link to="/">My Store</Link>
				</h1>

				{/* Desktop: Horizontal Navigation */}
				<nav className="hidden md:flex items-center gap-6 flex-1">
					<Link
						to="/"
						className="hover:text-cyan-400 transition-colors"
						activeProps={{
							className: "text-cyan-400",
						}}
					>
						Home
					</Link>
					<Link
						to="/products"
						className="hover:text-cyan-400 transition-colors"
						activeProps={{
							className: "text-cyan-400",
						}}
					>
						Products
					</Link>
					<Link
						to="/about"
						className="hover:text-cyan-400 transition-colors"
						activeProps={{
							className: "text-cyan-400",
						}}
					>
						About
					</Link>
					<Link
						to="/contact"
						className="hover:text-cyan-400 transition-colors"
						activeProps={{
							className: "text-cyan-400",
						}}
					>
						Contact
					</Link>

					{/* Desktop: Search Bar */}
					<div className="flex-1 max-w-md mx-4">
						<div className="relative">
							<Search
								className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
								size={18}
							/>
							<Input
								type="search"
								placeholder="Search products..."
								className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
							/>
						</div>
					</div>
				</nav>

				{/* Desktop & Mobile: Right Side - Auth + Cart */}
				<div className="flex items-center gap-3">
					{/* Desktop: Auth Section */}
					<div className="hidden md:flex items-center gap-3">
						{isAuthenticated ? (
							<>
								<div className="flex items-center gap-2 text-sm">
									<User size={18} />
									<span>{user?.first_name || user?.email}</span>
								</div>
								<Button
									variant="ghost"
									size="sm"
									onClick={handleLogout}
									className="hover:bg-gray-700"
								>
									<LogOut size={18} className="mr-1" />
									Logout
								</Button>
							</>
						) : (
							<Link to="/login">
								<Button variant="ghost" size="sm" className="hover:bg-gray-700">
									<LogIn size={18} className="mr-1" />
									Login
								</Button>
							</Link>
						)}
					</div>

					{/* Cart Icon (Mobile & Desktop) */}
					<Link to="/cart">
						<div className="relative p-2 hover:bg-gray-700 rounded-lg transition-colors">
							<ShoppingCart size={24} />
							{itemCount > 0 && (
								<span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
									{itemCount}
								</span>
							)}
						</div>
					</Link>
				</div>
			</header>

			<aside
				className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex items-center justify-between p-4 border-b border-gray-700">
					<h2 className="text-xl font-bold">Navigation</h2>
					<button
						type="button"
						onClick={() => setIsOpen(false)}
						className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
						aria-label="Close menu"
					>
						<X size={24} />
					</button>
				</div>

				<nav className="flex-1 p-4 overflow-y-auto">
					<Link
						to="/"
						onClick={() => setIsOpen(false)}
						className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
						activeProps={{
							className:
								"flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
						}}
					>
						<Home size={20} />
						<span className="font-medium">Home</span>
					</Link>

					<Link
						to="/products"
						onClick={() => setIsOpen(false)}
						className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
						activeProps={{
							className:
								"flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
						}}
					>
						<span className="font-medium">Products</span>
					</Link>

					<Link
						to="/about"
						onClick={() => setIsOpen(false)}
						className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
						activeProps={{
							className:
								"flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
						}}
					>
						<span className="font-medium">About</span>
					</Link>

					<Link
						to="/contact"
						onClick={() => setIsOpen(false)}
						className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
						activeProps={{
							className:
								"flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2",
						}}
					>
						<span className="font-medium">Contact</span>
					</Link>

					{/* Mobile: Auth Section */}
					<div className="mt-6 pt-6 border-t border-gray-700">
						{isAuthenticated ? (
							<div className="space-y-3">
								<div className="flex items-center gap-2 p-3 text-sm">
									<User size={18} />
									<span>{user?.first_name || user?.email}</span>
								</div>
								<button
									type="button"
									onClick={() => {
										handleLogout();
										setIsOpen(false);
									}}
									className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors text-left"
								>
									<LogOut size={20} />
									<span className="font-medium">Logout</span>
								</button>
							</div>
						) : (
							<Link
								to="/login"
								onClick={() => setIsOpen(false)}
								className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
							>
								<LogIn size={20} />
								<span className="font-medium">Login</span>
							</Link>
						)}
					</div>
				</nav>
			</aside>
		</>
	);
}
