<script setup>
import { useAuthStore } from "@/store/authStore";

import { computed } from "vue";
import { ref } from "vue";

import mobileMenuComponent from "./mobileMenuComponent.vue";
import MenuTest from "./MenuTest.vue";
import search from "./search.vue";

const authStore = useAuthStore();

const user = authStore.user.username || null;
const isModalOpen = ref(false);

const cartItemsAmount = computed(() => authStore.cartItemsAmount);

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};

const welcomeUser = () => {
  user == null || undefined ? "Log In" : `Welcome ${user}`;
};
</script>

<template>
  <header class="header-area">
    <menu-test />
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
          <div class="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6">
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
          <div class="col-xl-2 col-lg-2 col-md-8 col-sm-8 col-6">
            <div class="search-login-cart-wrapper">
              <div class="header-search same-style">
                <button class="search-toggle" @click="isModalOpen = true">
                  <search v-if="isModalOpen" />
                  <i class="icon-magnifier s-open"></i>
                </button>
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
          <mobile-menu-component />
        </div>
      </div>
    </div>
  </header>
</template>

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

.logo {
  display: flex;
  justify-content: flex-end;
}
</style>
