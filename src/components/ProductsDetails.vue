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
            <el-carousel height="400px" arrow="always" interval="5000">
              <el-carousel-item v-for="image in product.images" :key="image">
                <!-- <h3 class="small justify-center" text="2xl">{{ item }}</h3> -->
                <img :src="image" alt="carousel image" class="carousel-image" />
              </el-carousel-item>
            </el-carousel>
            <!-- <img
              v-else
              id="zoompro"
              :src="product.images[0]"
              data-zoom-image="assets/img/product-details/bl1.jpg"
              alt="zoom"
            /> -->
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
              <!-- <span type="success" class="inStock" v-if="product.isInStock"
                >In Stock</span
              >
              <span type="danger" class="outOfStock" v-else>Out Of Stock</span> -->
              <span :class="product.isInStock ? 'inStock' : 'outOfStock'">{{
                product.isInStock ? "INSTOCK" : "OUT OF STOCK"
              }}</span>
              <!-- !! SECOND SOLUTION BELOW -->
              <!-- <el-tag
                :type="product.isInStock ? 'success' : 'danger'"
                effect="dark"
                style="color: white"
              >
                {{ product.isInStock ? "INSTOCK" : "OUT OF STOCK" }}
              </el-tag> -->
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
import { useAuthStore } from "@/store/authStore";

import { io } from "socket.io-client";

import { ElNotification } from "element-plus";
import "element-plus/dist/index.css";

export default {
  name: "ProductsDetails",
  props: ["product"],
  data() {
    return {
      socket: null,
      quantity: 1,
      cartItemsAmount: 0,
      items: [
        "https://i5.walmartimages.com/asr/8e207c86-7884-4bb9-9181-70ca0928e7ad.a67bd9ad17b4329905b247e14f739690.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
        "https://crownwineandspirits.com/cdn/shop/products/grey-goose-vodka-grey-goose-vodka-1-75l-31515719958621.jpg?v=1664303338",
        "https://i.pinimg.com/originals/0f/cf/b2/0fcfb272e54b3589603a90bad790a200.jpg",
        "https://i.pinimg.com/736x/1f/1f/27/1f1f2723eedec8337befa786626b5bf9.jpg",
      ],
      delayedExecutionTimer: null,
    };
  },
  methods: {
    async addToCart() {
      const authStore = useAuthStore();

      const data = {
        productId: this.$route.params.productId,
        quantity: this.quantity,
      };

      const response = await axios.post(
        `/api/users/${authStore.user.id}/cart`,
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
      // EventBus.emit("add-to-cart", this.cartItemsAmount);
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
    async logLastViewedProduct() {
      const authStore = useAuthStore();

      try {
        await axios.post(
          `/api/last-viewed-products/${this.product._id}/${authStore.user.id}/add`
        );
      } catch (error) {
        console.error("Failed to log last viewed product:", error);
      }
    },
  },
  async created() {
    const authStore = useAuthStore();
    this.cartItemsAmount = authStore.getCartItemsAmount;
    // const cartItems = axios.get(`/api/users/${authStore.user.id}/cartQuantity`);

    // return (this.cartItemsAmount = cartItems.length);
  },

  watch: {
    product: {
      handler(newProduct) {
        if (this.socket && newProduct) {
          const productData = JSON.parse(JSON.stringify(newProduct));
          this.socket.emit("viewProduct", productData);
        }
      },
      immediate: true,
    },
  },

  mounted() {
    this.socket = io("https://localhost:8000");
    // const authStore = useAuthStore();

    // Only set the timer if both product and user data are available
    // if (this.product && authStore.user && authStore.user.id) {
    //   this.delayedExecutionTimer = setTimeout(() => {
    //     this.logLastViewedProduct();
    //   }, 3000); // Delay for 3 seconds
    // }
    // console.log(this.product);
    // const productData = JSON.parse(JSON.stringify(this.product)); // Clone to avoid reactivity issues
    // socket.emit("viewProduct", productData);
  },

  beforeUnmount() {
    // Clear the timer if the user navigates away before 3 seconds
    // if (this.delayedExecutionTimer) {
    //   clearTimeout(this.delayedExecutionTimer);
    //   this.delayedExecutionTimer = null;
    // }
    this.socket.emit("stopViewingProduct", this.product._id);
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
  color: white;
  background-color: #ff3131;
  padding: 5px;
  border-radius: 5px;
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
  background-color: #fff;
}

.form-control {
  border: none;
  text-align: center;
  pointer-events: none;
  margin: 0;
  padding: 0;
  height: 100%;
}

.cart-plus-minus {
  border-radius: 20px;
}

.inStock {
  color: white;
  background-color: rgb(34, 170, 46);
  padding: 5px;
  border-radius: 5px;
  font-family: "Roboto", sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 13px;
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

@media screen and (max-width: 700px) {
  .breadcrumb-area {
    height: 200px;
  }
}
</style>
