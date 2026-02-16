import { createDirectus, readItems, rest } from "@directus/sdk";
import type { Product } from "@/types";

export const directus = createDirectus("http://localhost:8055").with(rest());

export async function getProducts(): Promise<Product[]> {
	const items = await directus.request(readItems("products"));
	return items as Product[];
}
