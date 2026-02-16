import { createDirectus, readItem, readItems, rest } from "@directus/sdk";
import type { Product } from "@/types";

export const directus = createDirectus("http://localhost:8055").with(rest());

export async function getProducts(): Promise<Product[]> {
	const items = await directus.request(readItems("products"));
	// Convert price to number to avoid .toFixed() errors
	return (items as Product[]).map((item) => {
		const parsedPrice =
			typeof item.price === "string" ? parseFloat(item.price) : item.price;
		return {
			...item,
			price: isNaN(parsedPrice) ? 0 : parsedPrice,
		};
	});
}

export async function getProductById(id: string): Promise<Product> {
	const item = await directus.request(readItem("products", id));
	// Convert price to number to avoid .toFixed() errors
	const product = item as Product;
	const parsedPrice =
		typeof product.price === "string"
			? parseFloat(product.price)
			: product.price;
	return {
		...product,
		price: isNaN(parsedPrice) ? 0 : parsedPrice,
	};
}
