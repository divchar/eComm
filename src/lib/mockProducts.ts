import type { Product } from "@/types";

export const mockProducts: Product[] = [
	{
		id: "1",
		name: "Premium Laptop",
		price: 999.99,
		description: "High-performance laptop for professionals",
		date_created: new Date().toISOString(),
	},
	{
		id: "2",
		name: "Wireless Mouse",
		price: 29.99,
		description: "Ergonomic wireless mouse",
		date_created: new Date().toISOString(),
	},
	{
		id: "3",
		name: "Mechanical Keyboard",
		price: 149.99,
		description: "Premium mechanical keyboard with RGB lighting",
		date_created: new Date().toISOString(),
	},
];
