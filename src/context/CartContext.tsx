import {
	createContext,
	useContext,
	useState,
	useEffect,
	type ReactNode,
} from "react";
import {
	createCollection,
	localStorageCollectionOptions,
} from "@tanstack/react-db";
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

// Create the TanStack DB collection for cart items
const cartCollection = createCollection(
	localStorageCollectionOptions<CartItem>({
		id: "ecomm-cart",
		storageKey: "ecomm-cart",
		getKey: (item) => item.product.id,
	}),
);

export function CartProvider({ children }: { children: ReactNode }) {
	// Use useState to hold cart state
	const [cart, setCart] = useState<Cart>({ items: [] });

	// Load cart from collection on mount and subscribe to changes
	useEffect(() => {
		// Load initial data from collection
		const items = Array.from(cartCollection.state.values());
		setCart({ items });

		// Subscribe to changes
		const unsubscribe = cartCollection.subscribeChanges(() => {
			const updatedItems = Array.from(cartCollection.state.values());
			setCart({ items: updatedItems });
		});

		return unsubscribe;
	}, []);

	const addToCart = (product: Product, quantity: number) => {
		const existingItem = cartCollection.state.get(product.id);

		if (existingItem) {
			// Update existing item
			cartCollection.update(product.id, (draft) => {
				draft.quantity = draft.quantity + quantity;
			});
		} else {
			// Insert new item
			cartCollection.insert({ product, quantity });
		}
	};

	const removeFromCart = (productId: string) => {
		cartCollection.delete(productId);
	};

	const updateQuantity = (productId: string, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(productId);
			return;
		}

		cartCollection.update(productId, (draft) => {
			draft.quantity = quantity;
		});
	};

	const getTotalPrice = () => {
		return cart.items.reduce(
			(total, item) => total + item.product.price * item.quantity,
			0,
		);
	};

	const clearCart = () => {
		// Delete all items from the collection
		const itemIds = Array.from(cartCollection.state.keys());
		for (const id of itemIds) {
			cartCollection.delete(id);
		}
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
