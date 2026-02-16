import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useCart } from "./router-CSDkdY34.mjs";
import { B as Button } from "./button-BCPHRcXR.mjs";
import { C as Card } from "./card-C-Nyz2mD.mjs";
import { I as Input } from "./input-rT4sW3uW.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import "../_libs/lucide-react.mjs";
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
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/tailwind-merge.mjs";
function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getTotalPrice
  } = useCart();
  if (cart.items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold mb-8", children: "Shopping Cart" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Your cart is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Continue Shopping" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold mb-8", children: "Shopping Cart" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 mb-8", children: cart.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 flex items-center gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: item.product.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
          "$",
          item.product.price
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "1", value: item.quantity, onChange: (e) => updateQuantity(item.product.id, parseInt(e.target.value)), className: "w-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold w-24 text-right", children: [
          "$",
          (item.product.price * item.quantity).toFixed(2)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", onClick: () => removeFromCart(item.product.id), children: "Remove" })
      ] })
    ] }, item.product.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6 bg-muted", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold", children: "Total:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-3xl font-bold", children: [
          "$",
          getTotalPrice().toFixed(2)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full mb-4", size: "lg", children: "Checkout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full", children: "Continue Shopping" }) })
    ] })
  ] });
}
export {
  CartPage as component
};
