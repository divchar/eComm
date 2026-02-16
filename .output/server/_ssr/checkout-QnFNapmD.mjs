import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useCart } from "./router-BW7jlivQ.mjs";
import { B as Button } from "./button-BCPHRcXR.mjs";
import { C as Card } from "./card-C-Nyz2mD.mjs";
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
function CheckoutPage() {
  const {
    cart,
    getTotalPrice,
    clearCart
  } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      clearCart();
      navigate({
        to: "/products"
      });
    }, 1e3);
  };
  if (cart.items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold mb-8", children: "Checkout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Your cart is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate({
        to: "/products"
      }), children: "Continue Shopping" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold mb-8", children: "Checkout" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-4", children: "Order Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: cart.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center border-b pb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: item.product.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "Qty: ",
              item.quantity,
              " × $",
              item.product.price.toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold", children: [
            "$",
            (item.product.price * item.quantity).toFixed(2)
          ] })
        ] }, item.product.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 pt-4 border-t", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold", children: "Total:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold", children: [
            "$",
            getTotalPrice().toFixed(2)
          ] })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-4", children: "Payment Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: 'This is a demo checkout. Click "Complete Order" to finalize your purchase.' }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", size: "lg", onClick: handleCheckout, disabled: isProcessing, children: isProcessing ? "Processing..." : "Complete Order" })
      ] }) })
    ] })
  ] });
}
export {
  CheckoutPage as component
};
