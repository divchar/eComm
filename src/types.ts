export interface Product {
	id: string;
	name: string;
	price: number;
	description: string;
	date_created: string;
}
export interface CartItem {
	product: Product;
	quantity: number;
}

export interface Cart {
	items: CartItem[];
}

export interface CheckoutFormData {
	customerName: string;
	email: string;
	shippingAddress: string;
}

export interface OrderSummary {
	subtotal: number;
	tax: number;
	shipping: number;
	total: number;
}
