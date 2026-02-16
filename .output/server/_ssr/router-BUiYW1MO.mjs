import { c as createRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, O as Outlet, H as HeadContent, S as Scripts, L as Link } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { M as Menu, S as ShoppingCart, X, H as House } from "../_libs/lucide-react.mjs";
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
const appCss = "/assets/styles-Co4DSJIK.css";
const CartContext = reactExports.createContext(void 0);
function CartProvider({ children }) {
  const [cart, setCart] = reactExports.useState({ items: [] });
  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return {
          items: prevCart.items.map(
            (item) => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
          )
        };
      } else {
        return {
          items: [...prevCart.items, { product, quantity }]
        };
      }
    });
  };
  const removeFromCart = (productId) => {
    setCart((prevCart) => ({
      items: prevCart.items.filter((item) => item.product.id !== productId)
    }));
  };
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) => ({
      items: prevCart.items.map(
        (item) => item.product.id === productId ? { ...item, quantity } : item
      )
    }));
  };
  const getTotalPrice = () => {
    return cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CartContext.Provider,
    {
      value: {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotalPrice
      },
      children
    }
  );
}
function useCart() {
  const context = reactExports.useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
function Header() {
  const [isOpen, setIsOpen] = reactExports.useState(false);
  const { cart } = useCart();
  const itemCount = cart.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "p-4 flex items-center justify-between bg-gray-800 text-white shadow-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setIsOpen(true),
          className: "p-2 hover:bg-gray-700 rounded-lg transition-colors",
          "aria-label": "Open menu",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 24 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold flex-1 ml-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "My Store" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cart", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-2 hover:bg-gray-700 rounded-lg transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { size: 24 }),
        itemCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center", children: itemCount })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: `fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-700", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Navigation" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setIsOpen(false),
                className: "p-2 hover:bg-gray-800 rounded-lg transition-colors",
                "aria-label": "Close menu",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 24 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex-1 p-4 overflow-y-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/",
                onClick: () => setIsOpen(false),
                className: "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2",
                activeProps: {
                  className: "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(House, { size: 20 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Home" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/products",
                onClick: () => setIsOpen(false),
                className: "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2",
                activeProps: {
                  className: "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Products" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/about",
                onClick: () => setIsOpen(false),
                className: "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2",
                activeProps: {
                  className: "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "About" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/contact",
                onClick: () => setIsOpen(false),
                className: "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2",
                activeProps: {
                  className: "flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Contact" })
              }
            )
          ] })
        ]
      }
    )
  ] });
}
const Route$6 = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "My Store"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RootDocument, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CartProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
  ] }) });
}
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$5 = () => import("./contact-DJdm4oWK.mjs");
const Route$5 = createFileRoute("/contact")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./cart-Cfy02NqL.mjs");
const Route$4 = createFileRoute("/cart")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./about-Cv4b8sZR.mjs");
const Route$3 = createFileRoute("/about")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./index-FaxywBQ4.mjs");
const Route$2 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-DE0am4wb.mjs");
const Route$1 = createFileRoute("/products/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("../_productId-BqRVTJa2.mjs");
const Route = createFileRoute("/products/$productId")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const ContactRoute = Route$5.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$6
});
const CartRoute = Route$4.update({
  id: "/cart",
  path: "/cart",
  getParentRoute: () => Route$6
});
const AboutRoute = Route$3.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$6
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$6
});
const ProductsIndexRoute = Route$1.update({
  id: "/products/",
  path: "/products/",
  getParentRoute: () => Route$6
});
const ProductsProductIdRoute = Route.update({
  id: "/products/$productId",
  path: "/products/$productId",
  getParentRoute: () => Route$6
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  CartRoute,
  ContactRoute,
  ProductsProductIdRoute,
  ProductsIndexRoute
};
const routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router2 = createRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route as R,
  router as r,
  useCart as u
};
