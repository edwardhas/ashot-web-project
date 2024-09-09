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

import Vue from "vue";
import { createApp } from "vue";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";
import mitt from "mitt";
import axios from "axios";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

// Vue.config.productionTip = false;

axios.interceptors.request.use(
  (config) => {
    const token = store.state.token;
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
  .use(store)
  .use(autoAnimatePlugin)
  .use(ElementPlus)
  .mount("#app");
