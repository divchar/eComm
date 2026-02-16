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
