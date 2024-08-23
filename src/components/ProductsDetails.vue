<template>
  <div class="breadcrumb-area pt-95 pb-95 bg-img">
    <div class="container">
      <div class="breadcrumb-content text-center">
        <h2>Product Details</h2>
        <ul>
          <router-link :to="{ name: 'products' }">
            <li><a>home</a></li>
          </router-link>

          <li class="active">Product Details</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="shop-area pt-95 pb-100">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-6">
          <div class="product-details-img">
            <img
              id="zoompro"
              :src="product.image"
              data-zoom-image="assets/img/product-details/bl1.jpg"
              alt="zoom"
            />
            <div id="gallery" class="mt-12 product-dec-slider owl-carousel">
              <a
                data-image="assets/img/product-details/l1.jpg"
                data-zoom-image="assets/img/product-details/bl1.jpg"
              >
                <img src="assets/img/product-details/s1.jpg" alt="" />
              </a>
              <a
                data-image="assets/img/product-details/l2.jpg"
                data-zoom-image="assets/img/product-details/bl2.jpg"
              >
                <img src="assets/img/product-details/s2.jpg" alt="" />
              </a>
              <a
                data-image="assets/img/product-details/l3.jpg"
                data-zoom-image="assets/img/product-details/bl3.jpg"
              >
                <img src="assets/img/product-details/s3.jpg" alt="" />
              </a>
              <a
                data-image="assets/img/product-details/l4.jpg"
                data-zoom-image="assets/img/product-details/bl4.jpg"
              >
                <img src="assets/img/product-details/s4.jpg" alt="" />
              </a>
              <a
                data-image="assets/img/product-details/l3.jpg"
                data-zoom-image="assets/img/product-details/bl3.jpg"
              >
                <img src="assets/img/product-details/s3.jpg" alt="" />
              </a>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <div class="product-details-content">
            <h2>{{ product.name }}</h2>
            <div class="product-price">
              <span class="new">${{ product.price }}.00 </span>
              <span class="old" v-if="product.oldPrice"
                >${{ product.oldPrice }}.00</span
              >
            </div>
            <div class="in-stock">
              <span class="inStock" v-if="product.isInStock"
                ><i class="ion-android-checkbox-outline"></i> In Stock</span
              >
              <span class="outOfStock" v-else
                ><i class="ion-android-checkbox-outline"></i> Out Of Stock</span
              >
            </div>
            <p>{{ product.description }}</p>
            <div class="quality-wrapper mt-30 product-quantity">
              <label class="prevent-select">Qty:</label>

              <div class="cart-plus-minus">
                <!-- <input
                  class="cart-plus-minus-box"
                  type="number"
                  name="qtybutton"
                  value="1"
                  min="1"
                  max="10"
                /> -->

                <span
                  class="input-group-text prevent-select"
                  @click="manageQuantity(false)"
                  >-</span
                >
                <input
                  type="text"
                  class="form-control prevent-select"
                  v-model="quantity"
                />
                <span
                  class="input-group-text prevent-select"
                  @click="manageQuantity(true)"
                  >+</span
                >
              </div>
            </div>
            <div class="product-list-action">
              <div class="product-list-action-left">
                <a
                  v-if="product.isInStock"
                  @click="addToCart"
                  class="addtocart-btn"
                  href="#"
                  title="Add to cart"
                >
                  <i class="ion-bag"></i>
                  Add to cart
                </a>
                <a
                  v-else
                  class="disabled addtocart-btn"
                  href="#"
                  title="Add to cart"
                >
                  <i class="ion-bag"></i>
                  Out of stock
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "../assets/css/style.css";
import store from "../store/index";
import { getCartItems } from "../db_queries";
import EventBus from "../eventBus";

export default {
  name: "ProductsDetails",
  props: ["product"],
  data() {
    return {
      quantity: 1,
      cartItemsAmount: 0,
    };
  },
  methods: {
    async addToCart() {
      const data = {
        productId: this.$route.params.productId,
        quantity: this.quantity,
      };

      const response = await axios.post(
        `/api/users/${store.state.user.id}/cart`,
        data
      );

      const message = response.data.error
        ? response.data.error
        : response.data.success;

      this.cartItemsAmount++;
      EventBus.emit("add-to-cart", this.cartItemsAmount);
      alert(message);
    },
    manageQuantity(operation) {
      if (this.quantity > 0 && this.quantity < 10) {
        if (!operation) return this.quantity--;
        return this.quantity++;
      }
      if (this.quantity == 0) {
        if (!operation) return;
        return this.quantity++;
      } else if (this.quantity == 10) {
        if (!operation) return this.quantity--;
        return;
      }
    },
  },
  async created() {
    const cartItems = getCartItems(store.state.user.id);

    return (this.cartItemsAmount = cartItems.length);
  },
};
</script>

<style scoped>
/* .breadcrumb-area {
  background-image: url(../assets/img/banner/banner-2.jpg);
} */

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

.prevent-select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

.product-list-action-left a {
  text-decoration: none;
}

.outOfStock {
  color: #ff3131;
  font-family: sans-serif;
  font-size: 18px;
}

.disabled {
  cursor: not-allowed;
  pointer-events: none;
  background: grey;
  opacity: 0.5;
}

.input-group-text {
  border: none;
  cursor: pointer;
}

.form-control {
  border: none;
  text-align: center;
  pointer-events: none;
  margin: 0;
  padding: 0;
  height: 100%;
}

.inStock {
  color: rgb(34, 170, 46);
  font-family: sans-serif;
  font-size: 18px;
}
</style>
