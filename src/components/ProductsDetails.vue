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
            <!-- <img
              id="zoompro"
              :src="product.image"
              data-zoom-image="assets/img/product-details/bl1.jpg"
              alt="zoom"
            /> -->

            <!-- <el-carousel
              :interval="0"
              arrow="always"
              class="carousel-container"
            >
              <el-carousel-item
                class="carousel-item"
                v-for="item in items"
                :key="item"
              >
                <img :src="item" alt="carousel image" class="carousel-image" />
              </el-carousel-item>
            </el-carousel> -->

            <el-carousel height="400px" arrow="always" interval="5000">
              <el-carousel-item v-for="item in items" :key="item">
                <!-- <h3 class="small justify-center" text="2xl">{{ item }}</h3> -->
                <img :src="item" alt="carousel image" class="carousel-image" />
              </el-carousel-item>
            </el-carousel>
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
              <span type="success" class="inStock" v-if="product.isInStock"
                >In Stock</span
              >
              <span type="danger" class="outOfStock" v-else>Out Of Stock</span>
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

import { ElNotification } from "element-plus";
import "element-plus/dist/index.css";

export default {
  name: "ProductsDetails",
  props: ["product"],
  data() {
    return {
      quantity: 1,
      cartItemsAmount: 0,
      items: [
        "https://i5.walmartimages.com/asr/8e207c86-7884-4bb9-9181-70ca0928e7ad.a67bd9ad17b4329905b247e14f739690.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
        "https://crownwineandspirits.com/cdn/shop/products/grey-goose-vodka-grey-goose-vodka-1-75l-31515719958621.jpg?v=1664303338",
        "https://i.pinimg.com/originals/0f/cf/b2/0fcfb272e54b3589603a90bad790a200.jpg",
        "https://i.pinimg.com/736x/1f/1f/27/1f1f2723eedec8337befa786626b5bf9.jpg",
      ],
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

      ElNotification({
        title: response.data.success ? "Success!" : "Error!",
        message: message,
        type: response.data.success ? "success" : "error",
      });

      this.cartItemsAmount++;
      EventBus.emit("add-to-cart", this.cartItemsAmount);
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
    const cartItems = axios.get(
      `/api/users/${store.state.user.id}/cartQuantity`
    );

    console.log(cartItems.length);
    return (this.cartItemsAmount = cartItems.length);
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

.breadcrumb-area {
  position: relative;
  width: 100%;
  aspect-ratio: 9/2;
  overflow: hidden; /* Ensure no overflow from pseudo-element */
  background-size: cover;
  background-position: center;
}

.breadcrumb-area::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://www.empire-tcg.com/cdn/shop/files/IMG_2920.jpg?v=1723960927&width=3840");
  background-size: cover;
  background-position: center;
  filter: brightness(50%);
  z-index: -1; /* Place behind the content */
  animation: zoom-in-out 40s infinite;
}

.breadcrumb-content {
  position: relative;
  color: white; /* Ensure text is visible */
  text-align: center;
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
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 15px;
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
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 15px;
}

/* owl carousel */

.carousel-container {
  width: 100%;
  height: 300px;
}

.carousel-item {
  height: 100%;
}

.carousel-image {
  width: 100%; /* Ensures the image takes up the full width */
  height: 100%; /* Maintains aspect ratio */
  display: block; /* Removes any gaps around the image */
  object-fit: contain; /* Ensures the entire image fits without cropping */
}
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
  text-align: center;
}

/* .el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
} */
</style>
