<template>
  <div class="breadcrumb-area pt-95 pb-95 bg-img">
    <div class="container">
      <div class="breadcrumb-content text-center">
        <h2>Products</h2>
        <ul>
          <router-link :to="{ name: 'products' }">
            <li><a>home</a></li>
          </router-link>

          <li class="active">Product Details</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="product-area pt-95 pb-70 gray-bg">
    <div class="container">
      <div class="section-title text-center mb-55">
        <h4>Most Popular</h4>
        <h2>Recent Products</h2>
      </div>
      <div class="row" v-if="products[0]">
        <div
          class="col-xl-3 col-lg-4 col-md-6 col-sm-6"
          v-for="product in products"
          :key="product._id"
        >
          <div class="product-wrapper mb-10">
            <div class="product-img">
              <a href="">
                <router-link :to="{ path: `/products/${product._id}` }">
                  <img class="custom-image" :src="product.image" alt="" />
                </router-link>
              </a>
              <!-- "../assets/img/product/product-4.jpg" -->
              <div class="product-action">
                <router-link :to="{ path: `/products/${product._id}` }">
                  <a
                    class="ti-plus-a"
                    title="Quick View"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    <i class="ti-plus"></i>
                  </a>
                </router-link>

                <a
                  class="ti-shopping-cart-a"
                  title="Add To Cart"
                  @click="
                    toggleModal(
                      product.name,
                      product.image,
                      product.isInStock,
                      product._id
                    )
                  "
                >
                  <!-- !! $emit('add-to-cart', product._id) -->
                  <i class="ti-shopping-cart"></i>
                </a>
              </div>
            </div>
            <div class="product-content">
              <h4>
                <router-link :to="{ path: `/products/${product._id}` }">
                  <a href="">{{ product.name }}</a>
                </router-link>
              </h4>
              <div class="product-price">
                <span class="new">${{ product.price }}.00</span>
                <span class="old" v-if="product.oldPrice"
                  >${{ product.oldPrice }}.00</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="custom-empty-products-list" v-else>
        <h3>Products are coming soon...</h3>
      </div>
    </div>
  </div>

  <div class="deal-area bg-img pt-95 pb-100">
    <div class="container">
      <div class="section-title text-center mb-50">
        <h4>Best Product</h4>
        <h2>Deal of the Week</h2>
      </div>
      <div class="row">
        <div class="col-lg-6 col-md-6">
          <div class="deal-img wow fadeInLeft">
            <a href=""
              ><img src="../assets/img/banner/banner-2.png" alt=""
            /></a>
          </div>
        </div>

        <div class="col-lg-6 col-md-6">
          <div class="deal-content">
            <h3><a href="">Product</a></h3>
            <div class="deal-pro-price">
              <span class="deal-old-price">$16.00 </span>
              <span> $10.00</span>
            </div>
            <p>
              Lorem ipsum dolor sit amet, co adipisicing elit, sed do eiusmod
              tempor incididunt labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercita ullamco laboris nisi ut aliquip ex
              ea commodo
            </p>
            <div class="timer timer-style">
              <div data-countdown="2017/10/01"></div>
            </div>
            <div class="discount-btn mt-35">
              <a class="btn-style" href="">SHOP NOW</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr />
  <div class="service-area bg-img pt-100 pb-65">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-4">
          <div class="service-content text-center mb-30 service-color-1">
            <img src="../assets/img/icon-img/shipping.png" alt="" />
            <h4>FREE SHIPPING</h4>
            <p>Free shipping on all order</p>
          </div>
        </div>
        <div class="col-lg-4 col-md-4">
          <div class="service-content text-center mb-30 service-color-2">
            <img src="../assets/img/icon-img/support.png" alt="" />
            <h4>ONLINE SUPPORT</h4>
            <p>Online support 24 hours a day</p>
          </div>
        </div>
        <div class="col-lg-4 col-md-4">
          <div class="service-content text-center mb-30 service-color-3">
            <img src="../assets/img/icon-img/money.png" alt="" />
            <h4>MONEY RETURN</h4>
            <p>Back guarantee under 5 days</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr />
  <div class="blog-area pb-70">
    <div class="container">
      <div class="section-title text-center mb-60">
        <h4>Latest News</h4>
        <h2>From Our Blog</h2>
      </div>
      <div class="row">
        <div class="col-lg-4 col-md-6">
          <div class="blog-wrapper mb-30 gray-bg">
            <div class="blog-img hover-effect">
              <a href=""><img alt="" src="../assets/img/blog/blog-1.jpg" /></a>
            </div>
            <div class="blog-content">
              <div class="blog-meta">
                <ul>
                  <li>By: <span>Admin</span></li>
                  <li>Aug 1, 2024</li>
                </ul>
              </div>
              <h4>
                <a href="">Lorem ipsum dolor amet cons adipisicing elit</a>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="blog-wrapper mb-30 gray-bg">
            <div class="blog-img hover-effect">
              <a href=""><img alt="" src="../assets/img/blog/blog-2.jpg" /></a>
            </div>
            <div class="blog-content">
              <div class="blog-meta">
                <ul>
                  <li>By: <span>Admin</span></li>
                  <li>Aug 1, 2024</li>
                </ul>
              </div>
              <h4>
                <a href="">Lorem ipsum dolor amet cons adipisicing elit</a>
              </h4>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6">
          <div class="blog-wrapper mb-30 gray-bg">
            <div class="blog-img hover-effect">
              <a href=""><img alt="" src="../assets/img/blog/blog-3.jpg" /></a>
            </div>
            <div class="blog-content">
              <div class="blog-meta">
                <ul>
                  <li>By: <span>Admin</span></li>
                  <li>Aug 1, 2024</li>
                </ul>
              </div>
              <h4>
                <a href="">Lorem ipsum dolor amet cons adipisicing elit</a>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- !! Component -->
  <PopupQuickAdd
    v-if="showModal"
    :productName="productName"
    :productImageUrl="productImageUrl"
    :productIsInStock="isInStock"
    :productId="productId"
    :toggleModal="toggleModal"
  />
</template>

<script>
import axios from "axios";
import EventBus from "../eventBus";
import store from "../store/index";

import PopupQuickAdd from "./PopupQuickAdd.vue";

export default {
  name: "ProductsList",
  props: ["products", "isDisplayed"],
  components: { PopupQuickAdd },

  data() {
    return {
      cartItemsAmount: this.cartItemsAmount,
      showModal: false,
      productName: "",
      productImageUrl: "",
      productId: "",
      isInStock: null,
    };
  },

  methods: {
    toggleModal(name, image, isInStock, id) {
      this.showModal = !this.showModal; // Toggles the visibility
      this.productName = name;
      this.productImageUrl = image;
      this.isInStock = isInStock;
      this.productId = id;
    },
  },

  async created() {
    const cartItemsResponse = await axios.get(
      `/api/users/${store.state.user.id}/cart`
    );
    // const cartItems = cartItemsResponse.data;
    // this.cartItems = cartItems;

    // return (this.cartItemsAmount = cartItems.length);
  },

  // methods: {
  //   async addToCart(id) {
  //     await axios.post("/api/users/12345/cart", {
  //       productId: id,
  //     });
  //     EventBus.emit("add-to-cart", this.cartItemsAmount);
  //     alert("Added");
  //   },
  // },
};
</script>

<style scoped>
.breadcrumb-area {
  /* background-image: url(../assets/img/banner/banner-2.jpg); */
  aspect-ratio: 9/2;
  filter: brightness(50%);
  background-image: url("https://www.empire-tcg.com/cdn/shop/files/IMG_2920.jpg?v=1723960927&width=3840");
  background-size: 120%;
  animation: zoom-in-out 40s infinite;
}

@keyframes zoom-in-out {
  0% {
    background-size: 100%; /* Initial size */
  }
  50% {
    background-size: 120%; /* Zoom in at the halfway point */
  }
  100% {
    background-size: 100%; /* Zoom out back to original size */
  }
}

.product-action a {
  text-decoration: none;
}

.custom-empty-products-list {
  display: flex;
  justify-content: center;
}

.custom-image {
  aspect-ratio: 3/3;
}

.ti-plus-a {
  cursor: pointer;
}

.ti-shopping-cart-a {
  cursor: pointer;
}

hr {
  width: 85%;
  margin: 1rem 0;
  color: inherit;
  background-color: currentColor;
  border: 1px solid rgb(166, 162, 162);
  opacity: 0.25;
  margin: 0 auto;
}

.section-title h4 {
  margin-top: 100px;
}
</style>
