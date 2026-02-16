import { createContext, useContext, useState, type ReactNode } from "react";
import type { Cart, CartItem, Product } from "@/types";

interface CartContextType {
	cart: Cart;
	addToCart: (product: Product, quantity: number) => void;
	removeFromCart: (productId: string) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	getTotalPrice: () => number;
	clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
	const [cart, setCart] = useState<Cart>({ items: [] });

	const addToCart = (product: Product, quantity: number) => {
		setCart((prevCart) => {
			const existingItem = prevCart.items.find(
				(item) => item.product.id === product.id,
			);

			if (existingItem) {
				return {
					items: prevCart.items.map((item) =>
						item.product.id === product.id
							? { ...item, quantity: item.quantity + quantity }
							: item,
					),
				};
			} else {
				return {
					items: [...prevCart.items, { product, quantity }],
				};
			}
		});
	};

	const removeFromCart = (productId: string) => {
		setCart((prevCart) => ({
			items: prevCart.items.filter((item) => item.product.id !== productId),
		}));
	};

	const updateQuantity = (productId: string, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(productId);
			return;
		}

		setCart((prevCart) => ({
			items: prevCart.items.map((item) =>
				item.product.id === productId ? { ...item, quantity } : item,
			),
		}));
	};

	const getTotalPrice = () => {
		return cart.items.reduce(
			(total, item) => total + item.product.price * item.quantity,
			0,
		);
	};

	const clearCart = () => {
		setCart({ items: [] });
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				updateQuantity,
				getTotalPrice,
				clearCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within CartProvider");
	}
	return context;
}
