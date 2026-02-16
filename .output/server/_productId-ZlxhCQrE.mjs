import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { u as useNavigate } from "./_libs/tanstack__react-router.mjs";
import { a as getProductById } from "./_ssr/directus-C-N5P26j.mjs";
import { R as Route, u as useCart } from "./_ssr/router-BW7jlivQ.mjs";
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
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    getProductById(productId).then((data) => {
      setProduct(data);
      setLoading(false);
    }).catch((error) => {
      console.error("Error fetching product:", error);
      setLoading(false);
    });
  }, [productId]);
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto p-8", children: "Loading..." });
  }
  if (!product) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold mb-8", children: "Product Not Found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate({
        to: "/products"
      }), children: "Back to Products" })
    ] });
  }
  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate({
      to: "/cart"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "mb-6", onClick: () => navigate({
      to: "/products"
    }), children: "← Back to Products" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted rounded-lg flex items-center justify-center h-96", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Product Image" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold mb-4", children: product.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold text-primary mb-6", children: [
            "$",
            product.price.toFixed(2)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground mb-8", children: product.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-sm font-medium mb-2", children: "Quantity" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "1", value: quantity, onChange: (e) => setQuantity(parseInt(e.target.value) || 1), className: "w-full" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleAddToCart, size: "lg", className: "w-full", children: "Add to Cart" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 pt-8 border-t", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-4", children: "Product Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Product ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: product.id })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Date Added" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: new Date(product.date_created).toLocaleDateString() })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  ProductDetailsPage as component
};
