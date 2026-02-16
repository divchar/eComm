import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { n, t, r } from "../_libs/directus__sdk.mjs";
import { u as useCart } from "./router-CSDkdY34.mjs";
import { B as Button } from "./button-BCPHRcXR.mjs";
import { C as Card } from "./card-C-Nyz2mD.mjs";
import { I as Input } from "./input-rT4sW3uW.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tiny-warning.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/tailwind-merge.mjs";
const directus = t("http://localhost:8055").with(r());
async function getProducts() {
  const items = await directus.request(n("products"));
  return items;
}
function ProductsPage() {
  const [products, setProducts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [quantities, setQuantities] = reactExports.useState({});
  const {
    addToCart
  } = useCart();
  reactExports.useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto p-8", children: "Loading..." });
  }
  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    addToCart(product, quantity);
    setQuantities({
      ...quantities,
      [product.id]: 1
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold mb-8", children: "Our Products" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: products.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "overflow-hidden flex flex-col", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 flex-1 flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold mb-2", children: product.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4 flex-1", children: product.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold mb-4", children: [
        "$",
        product.price
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "1", placeholder: "Qty", value: quantities[product.id] || 1, onChange: (e) => setQuantities({
          ...quantities,
          [product.id]: parseInt(e.target.value) || 1
        }), className: "w-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "flex-1", onClick: () => handleAddToCart(product), children: "Add to Cart" })
      ] })
    ] }) }, product.id)) })
  ] });
}
export {
  ProductsPage as component
};
