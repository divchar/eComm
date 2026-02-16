import { n, r, t, a as r$1 } from "../_libs/directus__sdk.mjs";
const directus = t("http://localhost:8055").with(r$1());
async function getProducts() {
  const items = await directus.request(n("products"));
  return items.map((item) => ({
    ...item,
    price: typeof item.price === "string" ? parseFloat(item.price) : item.price
  }));
}
async function getProductById(id) {
  const item = await directus.request(r("products", id));
  const product = item;
  return {
    ...product,
    price: typeof product.price === "string" ? parseFloat(product.price) : product.price
  };
}
export {
  getProductById as a,
  getProducts as g
};
