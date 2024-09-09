import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import store from "../store/index";

import ShoppingCartPage from "../views/ShoppingCartPage";
import ProductDetailPage from "../views/ProductDetailPage";
import ProductsPage from "../views/ProductsPage";

import AboutUsPage from "../views/AboutUsPage";
import ContactUsPage from "../views/ContactUsPage";
import NotFoundPage from "../views/NotFoundPage";
import CheckoutPage from "../views/CheckoutPage";
import MyAccountPage from "../views/MyAccountPage";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";
import ForgetPasswordPage from "../views/ForgetPasswordPage";
import AdminPage from "../views/AdminPage.vue";
import AdminPanelEmails from "../views/AdminPanelEmails.vue";
import AdminEditDeleteProductComponent from "../components/AdminEditDeleteProductComponent.vue";

const routes = [
  {
    path: "/",
    name: "products",
    component: ProductsPage,
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuthenticated) {
        next("/login"); // Redirect to login page
      } else {
        next(); // Proceed to the route
      }
    },
  },

  {
    path: "/about-us",
    name: "about-us",
    component: AboutUsPage,
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuthenticated) {
        next("/login"); // Redirect to login page
      } else {
        next(); // Proceed to the route
      }
    },
  },
  {
    path: "/contact-us",
    name: "contact-us",
    component: ContactUsPage,
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuthenticated) {
        next("/login"); // Redirect to login page
      } else {
        next(); // Proceed to the route
      }
    },
  },
  {
    path: "/checkout",
    name: "checkout",
    component: CheckoutPage,
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuthenticated) {
        next("/login"); // Redirect to login page
      } else {
        next(); // Proceed to the route
      }
    },
  },
  {
    path: "/my-account",
    name: "my-account",
    component: MyAccountPage,
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuthenticated) {
        next("/login"); // Redirect to login page
      } else {
        next(); // Proceed to the route
      }
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
  },
  {
    path: "/recover",
    name: "recover",
    component: ForgetPasswordPage,
  },
  {
    path: "/cart",
    name: "cart",
    component: ShoppingCartPage,
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuthenticated) {
        next("/login"); // Redirect to login page
      } else {
        next(); // Proceed to the route
      }
    },
  },
  {
    path: "/products/:productId",
    name: "productDetails",
    component: ProductDetailPage,
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuthenticated) {
        next("/login"); // Redirect to login page
      } else {
        next(); // Proceed to the route
      }
    },
  },
  {
    path: "/admin/panel/:userId/:emailId",
    name: "AdminPageEmailsReply",
    component: AdminPanelEmails,
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuthenticated || !store.state.user.isAdmin) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/admin/panel/edit_delete_product/:productId",
    name: AdminEditDeleteProductComponent,
    component: AdminEditDeleteProductComponent,
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuthenticated || !store.state.user.isAdmin) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/admin/panel",
    name: "AdminPage",
    component: AdminPage,
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuthenticated || !store.state.user.isAdmin) {
        next("/");
      } else {
        next();
      }
    },
  },

  {
    path: "/:pathMatch(.*)*",
    name: "notFoundPage",
    component: NotFoundPage,
  },
];

const router = createRouter({
  mode: "history",
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = store.getters.isAuthenticated;

  if (requiresAuth && isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
