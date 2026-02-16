import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as Card } from "./card-C-Nyz2mD.mjs";
import { B as Button } from "./button-BCPHRcXR.mjs";
import { I as Input } from "./input-rT4sW3uW.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
function ContactPage() {
  const [formData, setFormData] = reactExports.useState({
    name: "",
    email: "",
    message: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      email: "",
      message: ""
    });
    alert("Thank you for contacting us!");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto p-8 max-w-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold mb-8", children: "Contact Us" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "p-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "name", className: "block text-sm font-medium mb-2", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "text", placeholder: "Your name", value: formData.name, onChange: (e) => setFormData({
          ...formData,
          name: e.target.value
        }), required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "block text-sm font-medium mb-2", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", placeholder: "your@email.com", value: formData.email, onChange: (e) => setFormData({
          ...formData,
          email: e.target.value
        }), required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "message", className: "block text-sm font-medium mb-2", children: "Message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { placeholder: "Your message", value: formData.message, onChange: (e) => setFormData({
          ...formData,
          message: e.target.value
        }), required: true, className: "w-full border rounded-md p-2 min-h-32" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", children: "Send Message" })
    ] }) })
  ] });
}
export {
  ContactPage as component
};
