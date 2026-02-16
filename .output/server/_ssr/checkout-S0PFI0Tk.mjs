import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useCart } from "./router-BiWhQzuX.mjs";
import { B as Button } from "./button-BCPHRcXR.mjs";
import { C as Card } from "./card-C-Nyz2mD.mjs";
import { I as Input } from "./input-rT4sW3uW.mjs";
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
    removeFromCart,
    updateQuantity,
    getTotalPrice
  } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = reactExports.useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const calculateOrderSummary = () => {
    const subtotal = getTotalPrice();
    const tax = subtotal * 0.1;
    const shipping = subtotal >= 100 ? 0 : 10;
    const total = subtotal + tax + shipping;
    return {
      subtotal,
      tax,
      shipping,
      total
    };
  };
  const orderSummary = calculateOrderSummary();
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }
    if (!formData.zip.trim()) {
      newErrors.zip = "ZIP code is required";
    } else if (!/^\d{5}(-\d{4})?$/.test(formData.zip)) {
      newErrors.zip = "ZIP code is invalid";
    }
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Card number is required";
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: void 0
      }));
    }
  };
  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert(`Order placed successfully! Total: $${orderSummary.total.toFixed(2)}`);
      navigate({
        to: "/products"
      });
    }
  };
  if (cart.items.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold mb-8", children: "Checkout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-8 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "Your cart is empty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Back to Shopping" }) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto p-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold mb-8", children: "Checkout" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-4", children: "Review Your Items" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: cart.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-4 flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold", children: item.product.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "$",
                item.product.price.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", min: "1", value: item.quantity, onChange: (e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1), className: "w-16 h-8 text-sm" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold w-20 text-right", children: [
                "$",
                (item.product.price * item.quantity).toFixed(2)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", size: "sm", onClick: () => removeFromCart(item.product.id), children: "Remove" })
            ] })
          ] }, item.product.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handlePlaceOrder, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-4", children: "Shipping & Billing" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "firstName", className: "block text-sm font-medium mb-1", children: "First Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "firstName", type: "text", value: formData.firstName, onChange: (e) => handleInputChange("firstName", e.target.value), className: errors.firstName ? "border-red-500" : "" }),
              errors.firstName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.firstName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "lastName", className: "block text-sm font-medium mb-1", children: "Last Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "lastName", type: "text", value: formData.lastName, onChange: (e) => handleInputChange("lastName", e.target.value), className: errors.lastName ? "border-red-500" : "" }),
              errors.lastName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.lastName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "block text-sm font-medium mb-1", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "email", type: "email", value: formData.email, onChange: (e) => handleInputChange("email", e.target.value), className: errors.email ? "border-red-500" : "" }),
              errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.email })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "address", className: "block text-sm font-medium mb-1", children: "Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "address", type: "text", value: formData.address, onChange: (e) => handleInputChange("address", e.target.value), className: errors.address ? "border-red-500" : "" }),
              errors.address && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.address })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "city", className: "block text-sm font-medium mb-1", children: "City" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "city", type: "text", value: formData.city, onChange: (e) => handleInputChange("city", e.target.value), className: errors.city ? "border-red-500" : "" }),
              errors.city && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.city })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "state", className: "block text-sm font-medium mb-1", children: "State" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "state", type: "text", value: formData.state, onChange: (e) => handleInputChange("state", e.target.value), className: errors.state ? "border-red-500" : "" }),
              errors.state && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.state })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "zip", className: "block text-sm font-medium mb-1", children: "ZIP Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "zip", type: "text", value: formData.zip, onChange: (e) => handleInputChange("zip", e.target.value), className: errors.zip ? "border-red-500" : "" }),
              errors.zip && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.zip })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "cardNumber", className: "block text-sm font-medium mb-1", children: "Card Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "cardNumber", type: "text", value: formData.cardNumber, onChange: (e) => handleInputChange("cardNumber", e.target.value), className: errors.cardNumber ? "border-red-500" : "", placeholder: "1234567890123456" }),
              errors.cardNumber && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-500 text-xs mt-1", children: errors.cardNumber })
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold mb-4", children: "Order Summary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                "$",
                orderSummary.subtotal.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Tax (10%)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
                "$",
                orderSummary.tax.toFixed(2)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Shipping" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: orderSummary.shipping === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-600", children: "FREE" }) : `$${orderSummary.shipping.toFixed(2)}` })
            ] }),
            orderSummary.subtotal < 100 && orderSummary.subtotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Add $",
              (100 - orderSummary.subtotal).toFixed(2),
              " more for free shipping"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold", children: "Total" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-bold", children: [
                "$",
                orderSummary.total.toFixed(2)
              ] })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full mt-6", size: "lg", onClick: handlePlaceOrder, children: "Place Order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cart", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full mt-4", children: "Back to Cart" }) })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  CheckoutPage as component
};
