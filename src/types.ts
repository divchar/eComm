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
	firstName: string;
	lastName: string;
	email: string;
	address: string;
	city: string;
	state: string;
	zipCode: string;
	cardNumber: string;
}

export interface OrderSummary {
	subtotal: number;
	tax: number;
	shipping: number;
	grandTotal: number;
}
