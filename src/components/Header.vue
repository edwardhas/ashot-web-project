<template>
  <!-- <link rel="stylesheet" href="assets/css/bootstrap.min.css" />
  <link rel="stylesheet" href="assets/css/animate.css" />
  <link rel="stylesheet" href="assets/css/simple-line-icons.css" />
  <link rel="stylesheet" href="assets/css/themify-icons.css" />
  <link rel="stylesheet" href="assets/css/owl.carousel.min.css" />
  <link rel="stylesheet" href="assets/css/slick.css" />
  <link rel="stylesheet" href="assets/css/meanmenu.min.css" />
  <link rel="stylesheet" href="assets/css/style.css" />
  <link rel="stylesheet" href="assets/css/responsive.css" /> -->

  <header class="header-area">
    <div class="header-top theme-bg">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-4 col-12">
            <div class="welcome-area">
              <p>{{ welcomeUser() }}</p>
            </div>
          </div>
          <div class="col-lg-8 col-md-8 col-12">
            <div class="account-curr-lang-wrap f-right">
              <router-link :to="{ name: 'login' }">
                <a class="custom-a-htop">Log In</a>
              </router-link>
              <span class="vr"></span>
              <router-link :to="{ name: 'register' }">
                <a class="custom-a-htop">Sign Up</a>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header-bottom transparent-bar">
      <div class="container">
        <div class="row">
          <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-5">
            <div class="logo pt-39">
              <a href="/"><img alt="Logo goes here" src="" /></a>
            </div>
          </div>
          <div class="col-xl-8 col-lg-7 d-none d-lg-block">
            <div class="main-menu text-center">
              <nav>
                <ul>
                  <li>
                    <router-link :to="{ name: 'products' }">
                      <a>HOME</a>
                    </router-link>
                  </li>
                  <li>
                    <a>PAGES</a>
                    <ul class="submenu">
                      <li>
                        <router-link :to="{ name: 'about-us' }">
                          <a>about us</a>
                        </router-link>
                      </li>

                      <li>
                        <router-link :to="{ name: 'cart' }">
                          <a>cart page</a>
                        </router-link>
                      </li>
                      <li>
                        <router-link :to="{ name: 'checkout' }">
                          <a>checkout</a>
                        </router-link>
                      </li>
                      <li>
                        <router-link :to="{ name: 'contact-us' }">
                          <a>contact us</a>
                        </router-link>
                      </li>
                      <li>
                        <router-link :to="{ name: 'my-account' }"
                          ><a>my account</a>
                        </router-link>
                      </li>
                      <li>
                        <router-link :to="{ name: 'login' }">
                          <a>login</a>
                        </router-link>
                      </li>
                      <li>
                        <router-link :to="{ name: 'register' }">
                          <a>register</a>
                        </router-link>
                      </li>
                    </ul>
                  </li>
                  <router-link :to="{ name: 'about-us' }">
                    <li><a>ABOUT</a></li>
                  </router-link>
                  <router-link :to="{ name: 'contact-us' }">
                    <li><a>contact us</a></li>
                  </router-link>
                </ul>
              </nav>
            </div>
          </div>
          <div class="col-xl-2 col-lg-2 col-md-8 col-sm-8 col-7">
            <div class="search-login-cart-wrapper">
              <div class="header-search same-style">
                <button class="search-toggle">
                  <i class="icon-magnifier s-open"></i>
                  <i class="ti-close s-close"></i>
                </button>
                <div class="search-content">
                  <form action="#">
                    <input type="text" placeholder="Search" />
                    <button>
                      <i class="icon-magnifier"></i>
                    </button>
                  </form>
                </div>
              </div>
              <div class="header-login same-style">
                <router-link :to="{ name: 'my-account' }">
                  <a><i class="icon-user icons"></i></a>
                </router-link>
              </div>

              <div class="header-cart same-style">
                <button class="icon-cart">
                  <router-link :to="{ name: 'cart' }">
                    <i class="icon-handbag"></i>
                    <span class="count-style">{{ cartItemsAmount }}</span>
                  </router-link>
                </button>
              </div>
            </div>
          </div>
          <!-- <div
            class="mobile-menu-area electro-menu d-md-block col-md-12 col-lg-12 col-12 d-lg-none d-xl-none"
          >
            <div class="mobile-menu">
              <nav>
                <div>Home</div>
                <div>Cart</div>
                <div>Account</div>
                <div>About Us</div>
                <div>Contact Us</div>
              </nav>
            </div>
          </div> -->
          <mobileMenuComponent />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import axios from "axios";
import EventBus from "../eventBus";
import store from "../store/index";

import mobileMenuComponent from "./mobileMenuComponent.vue";

export default {
  name: "Header",
  components: { mobileMenuComponent },
  data() {
    return {
      cartItems: [],
      cartItemsAmount: 0,
      user: store.state.user.username || null,
    };
  },
  async created() {
    const response = await axios.get(`/api/users/${store.state.user.id}/cart`);
    const cartItems = response.data;
    this.cartItems = cartItems;
    this.cartItemsAmount = cartItems.length;

    EventBus.on("remove-from-cart", (data) => {
      this.cartItemsAmount = data;
    });
    EventBus.on("add-to-cart", (data) => {
      console.log(data);
      this.cartItemsAmount = data;
    });
  },
  methods: {
    welcomeUser() {
      if (this.user == null || this.user == undefined)
        return "Your name is supposed to be here. You have to log in!";
      return `Welcome, ${this.user}!`;
    },
  },
  beforeUnmount() {
    EventBus.off("update-cart");
  },
  // methods: {
  //   countAmountOfItems() {
  //     let counter = 0;
  //     for (let i = 1; i <= this.cartItems.length; i++) {
  //       counter = i;
  //     }
  //     return (this.cartItemsAmount = counter);
  //   },
  // },
};
</script>

<style scoped>
.account-curr-lang-wrap {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: row;
}

.vr {
  background: white;
}

.header-login a {
  text-decoration: none;
}

.custom-a-htop {
  text-decoration: none;
  display: flex;
  align-self: center;
  color: white;
  margin: 20px;
}

.custom-a-htop:hover {
  color: black;
}

.custom-submit.custom-btn-style {
  background-color: #7e4c4f;
  border: medium none;
  width: 100px;
  cursor: pointer;
  color: #fff;
  font-weight: 600;
  transition: 0.5s;
}
.custom-submit.custom-btn-style:hover {
  background-color: #242424;
}
</style>
