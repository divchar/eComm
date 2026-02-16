import { n, r, t, a as r$1 } from "../_libs/directus__sdk.mjs";
const directus = t("http://localhost:8055").with(r$1());
async function getProducts() {
  const items = await directus.request(n("products"));
  return items;
}
async function getProductById(id) {
  const item = await directus.request(r("products", id));
  return item;
}
export {
  getProductById as a,
  getProducts as g
};
