import $ from "jquery";

window.$ = $;
window.jQuery = $;

// import "bootstrap/dist/css/bootstrap.css";
// import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

import "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/responsive.css";
import "./assets/css/simple-line-icons.css";
import "./assets/css/style.css";
import "./assets/css/themify-icons.css";
import "./assets/css/slick.css";
import "./assets/css/owl.carousel.min.css";
import "./assets/css/animate.css";
import "./assets/css/jquery-ui.css";
import "./assets/css/meanmenu.min.css";
import "./assets/js/plugins.js";
import "./assets/js/main.js";
import "./assets/js/vendor/jquery-1.12.0.min.js";
import "./assets/js/jquery.meanmenu";

import PrimeVue from "primevue/config";
import Lara from "@primevue/themes/lara";

import Vue from "vue";
import { createApp } from "vue";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import App from "./App.vue";
import router from "./router";
import mitt from "mitt";
import axios from "axios";
import { createPinia } from "pinia";
import { useAuthStore } from "./store/authStore";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const pinia = createPinia();
// Vue.config.productionTip = false;

axios.interceptors.request.use(
  (config) => {
    const token = useAuthStore().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

createApp(App)
  .use(router)
  .use(autoAnimatePlugin)
  .use(ElementPlus)
  .use(pinia)
  .use(PrimeVue, { theme: { preset: Lara } })
  .mount("#app");
