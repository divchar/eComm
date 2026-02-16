import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { a as getProductById } from "./_ssr/directus-CArNUU_Q.mjs";
import { R as Route, u as useCart } from "./_ssr/router-BUiYW1MO.mjs";
import { B as Button } from "./_ssr/button-BCPHRcXR.mjs";
import { C as Card } from "./_ssr/card-C-Nyz2mD.mjs";
import { I as Input } from "./_ssr/input-rT4sW3uW.mjs";
import "./_libs/tiny-warning.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/tiny-invariant.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
import "./_libs/directus__sdk.mjs";
import "./_libs/lucide-react.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/clsx.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/tailwind-merge.mjs";
function ProductDetailsPage() {
  const {
    productId
  } = Route.useParams();
  const [product, setProduct] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [quantity, setQuantity] = reactExports.useState(1);
  const {
    addToCart
  } = useCart();
  reactExports.useEffect(() => {
    getProductById(productId).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [productId]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto p-8", children: "Loading..." });
  }
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto p-8", children: "Product not found" });
  }
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "mb-6", children: "← Back to Products" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold mb-4", children: product.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground mb-6", children: product.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold mb-8", children: [
        "$",
        product.price
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "quantity", className: "font-medium", children: "Quantity:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "quantity", type: "number", min: "1", value: quantity, onChange: (e) => setQuantity(parseInt(e.target.value) || 1), className: "w-24" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", onClick: handleAddToCart, children: "Add to Cart" })
      ] })
    ] }) })
  ] });
}
export {
  ProductDetailsPage as component
};
