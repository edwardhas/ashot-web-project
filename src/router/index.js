import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";

import { useAuthStore } from "@/store/authStore";

// import ShoppingCartPage from "../views/ShoppingCartPage";
// import ProductDetailPage from "../views/ProductDetailPage";
// import ProductsPage from "../views/ProductsPage";

// import AboutUsPage from "../views/AboutUsPage";
// import ContactUsPage from "../views/ContactUsPage";
// import NotFoundPage from "../views/NotFoundPage";
// import CheckoutPage from "../views/CheckoutPage";
// import MyAccountPage from "../views/MyAccountPage";
// import LoginPage from "../views/LoginPage";
// import RegisterPage from "../views/RegisterPage";
// import ForgetPasswordPage from "../views/ForgetPasswordPage";
// import PaymentCancel from "@/views/PaymentCancel.vue";
// import PaymentSuccess from "@/views/PaymentSuccess.vue";
// import AdminPage from "../views/AdminPage.vue";
// import AdminPanelEmails from "../views/AdminPanelEmails.vue";
// import AdminEditDeleteProductComponent from "../components/AdminEditDeleteProductComponent.vue";
// import AdminPanelStatistics from "../views/AdminPanelStatistics.vue";
// import AddingProductsComponent from "../components/AddingProductsComponent.vue";
// import search from "@/components/search.vue";

const routes = [
  {
    path: "/search",
    name: "search",
    component: () => import("@/components/search.vue"),
  },
  {
    path: "/",
    name: "products",
    component: () => import("../views/ProductsPage"),
    beforeEnter: (to, from, next) => {
      if (!useAuthStore().isAuthenticated) {
        next("/login"); // Redirect to login page
      } else {
        next(); // Proceed to the route
      }
    },
  },

  {
    path: "/about-us",
    name: "about-us",
    component: () => import("../views/AboutUsPage"),
    beforeEnter: (to, from, next) => {
      if (!useAuthStore().isAuthenticated) {
        next("/login"); // Redirect to login page
      } else {
        next(); // Proceed to the route
      }
    },
  },
  {
    path: "/contact-us",
    name: "contact-us",
    component: () => import("../views/ContactUsPage"),
    beforeEnter: (to, from, next) => {
      if (!useAuthStore().isAuthenticated) {
        next("/login"); // Redirect to login page
      } else {
        next(); // Proceed to the route
      }
    },
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () => import("../views/CheckoutPage"),
    beforeEnter: (to, from, next) => {
      if (!useAuthStore().isAuthenticated) {
        next("/login"); // Redirect to login page
      } else {
        next(); // Proceed to the route
      }
    },
  },
  {
    path: "/cancel",
    name: "PaymentCancel",
    component: () => import("@/views/PaymentCancel.vue"),
    beforeEnter: (to, from, next) => {
      if (!useAuthStore().isAuthenticated) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/success",
    name: "PaymentSuccess",
    component: () => import("@/views/PaymentSuccess.vue"),
    beforeEnter: (to, from, next) => {
      if (!useAuthStore().isAuthenticated) {
        next("/login");
      } else {
        next();
      }
    },
  },
  {
    path: "/test",
    name: "Stats",
    component: () => import("../views/AdminPanelStatistics.vue"),
  },
  {
    path: "/gpt-send-request",
    name: "ChatGPT-3",
    component: () => import("../views/ChatGPT.vue"),
  },
  {
    name: "shop-list",
    path: "/shop-list",
    component: () => import("../views/ShopList.vue"),
  },
  {
    path: "/adding-products",
    name: "adding-products",
    component: () => import("../components/AddingProductsComponent.vue"),
  },
  {
    path: "/my-account",
    name: "my-account",
    component: () => import("../views/MyAccountPage"),
    beforeEnter: (to, from, next) => {
      if (!useAuthStore().isAuthenticated) {
        next("/login"); // Redirect to login page
      } else {
        next(); // Proceed to the route
      }
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginPage"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterPage"),
  },
  {
    path: "/recover",
    name: "recover",
    component: () => import("../views/ForgetPasswordPage"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/ShoppingCartPage"),
    beforeEnter: (to, from, next) => {
      if (!useAuthStore().isAuthenticated) {
        next("/login"); // Redirect to login page
      } else {
        next(); // Proceed to the route
      }
    },
  },
  {
    path: "/products/:productId",
    name: "productDetails",
    component: () => import("../views/ProductDetailPage"),
    beforeEnter: (to, from, next) => {
      if (!useAuthStore().isAuthenticated) {
        next("/login"); // Redirect to login page
      } else {
        next(); // Proceed to the route
      }
    },
  },
  {
    path: "/admin/panel/:userId/:emailId",
    name: "AdminPageEmailsReply",
    component: () => import("../views/AdminPanelEmails.vue"),
    beforeEnter: (to, from, next) => {
      if (!useAuthStore().isAuthenticated || !useAuthStore().user.isAdmin) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/admin/panel/edit_delete_product/:productId",
    name: "AdminEditDeleteProductComponent",
    component: () =>
      import("../components/AdminEditDeleteProductComponent.vue"),
    beforeEnter: (to, from, next) => {
      if (!useAuthStore().isAuthenticated || !useAuthStore().user.isAdmin) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/admin/panel",
    name: "AdminPage",
    component: () => import("../views/AdminPage.vue"),
    beforeEnter: (to, from, next) => {
      if (!useAuthStore().isAuthenticated || !useAuthStore().user.isAdmin) {
        next("/");
      } else {
        next();
      }
    },
  },

  {
    path: "/:pathMatch(.*)*",
    name: "notFoundPage",
    component: () => import("../views/NotFoundPage"),
  },
];

const router = createRouter({
  mode: "history",
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // If the user used the back/forward browser button, return to the saved position
      return savedPosition;
    } else {
      // Always scroll to the top when navigating to a new page
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = useAuthStore().isAuthenticated;

  if (requiresAuth && isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
