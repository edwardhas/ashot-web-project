<template>
  <div class="breadcrumb-area pt-95 pb-95 bg-img">
    <div class="container">
      <div class="breadcrumb-content text-center">
        <h1 class="text-flicker-in-glow">A Place where it begins</h1>
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
          class="col-xl-3 col-lg-4 col-md-6 col-sm-2"
          v-for="product in products"
          :key="product._id"
        >
          <div class="product-wrapper mb-10">
            <div class="product-img">
              <a href="">
                <router-link :to="{ path: `/products/${product._id}` }">
                  <img class="custom-image" :src="product.images[0]" alt="" />
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
                    <el-button text class="ti-plus"></el-button>
                    <!-- <i class="ti-plus"></i> -->
                  </a>
                </router-link>

                <a class="ti-shopping-cart-a" title="Add To Cart">
                  <el-button
                    text
                    @click="
                      (isDisplayingTable = true),
                        passCurrentProductToDrawer(product)
                    "
                    class="ti-shopping-cart"
                  ></el-button>
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
  <!-- <div class="deal-area bg-img pt-95 pb-100">
    <div class="container">
      <div class="section-title text-center mb-50">
        <h4>Best Product</h4>
        <h2>Deal of the Week</h2>
      </div>
      <div class="row">
        <div class="col-lg-6 col-md-6">
          <div class="deal-img wow fadeInLeft">
            <a href=""><img :src="dealImageUrl" alt="" /></a>
          </div>
        </div>

        <div class="col-lg-6 col-md-6">
          <div class="deal-content">
            <h3>
              <a href="">{{ dealName }}</a>
            </h3>
            <div class="deal-pro-price">
              <span class="deal-old-price">${{ dealOldPrice }}.00 </span>
              <span> ${{ dealPrice }}.00</span>
            </div>
            <p>
              {{ dealDescription }}
            </p>
            <CountdownTimer />
            <div class="discount-btn mt-35">
              <a class="btn-style" href="">SHOP NOW</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <div class="deal-area bg-img deal-style-white pt-95 pb-100 bg-img">
    <div class="container">
      <div class="section-title section-title-white text-center mb-50">
        <h4>Best Product</h4>
        <h2>Deal of the Week</h2>
      </div>
      <div class="row">
        <div class="col-lg-6 col-md-6">
          <div class="deal-img wow fadeInLeft">
            <a><img :src="dealImageUrl[0]" alt="" /></a>
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <div class="deal-content">
            <h3>
              <h4 style="color: whitesmoke">{{ dealName }}</h4>
            </h3>
            <div class="deal-pro-price">
              <span class="deal-old-price">${{ dealOldPrice }}.00</span>
              <span>${{ dealPrice }}.00</span>
            </div>
            <p style="font-size: 16px">
              {{ dealDescription }}
            </p>
            <CountdownTimer />
            <div class="discount-btn mt-35">
              <router-link :to="{ path: `/products/${dealProductId}` }">
                <a class="btn-style" href="#" style="text-decoration: none"
                  >SHOP NOW</a
                >
              </router-link>
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

  <el-drawer
    v-model="isDisplayingTable"
    title="This is your Cart. You can add an item to it!"
    direction="rtl"
    size="50%"
    lock-scroll="true"
    z-index="999"
  >
    <div class="drawer-adding-product">
      <img :src="drawerShowCurrentItem('images')" />
      <div class="drawer-adding-data">
        <div class="drawer-adding-data-name">
          <p>{{ drawerShowCurrentItem("name") }}</p>
        </div>

        <div class="drawer-adding-data-prices">
          <p>${{ drawerShowCurrentItem("price") }}.00</p>
        </div>

        <div class="drawer-adding-data-quantity">
          <div class="cart-plus-minus">
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
      </div>
    </div>

    <h3 style="display: flex; justify-content: center; margin-bottom: 50px">
      Your Cart
    </h3>
    <el-table :data="gridData">
      <el-table-column label="Image" width="100">
        <template #default="scope">
          <img
            :src="scope.row.images[0]"
            alt="Item Image"
            style="width: 100px; height: auto"
          />
        </template>
      </el-table-column>
      <el-table-column property="name" label="Name" width="200" />
      <el-table-column property="price" label="Price" />
      <el-table-column property="isInStock" label="Availability" />
    </el-table>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="isDisplayingTable = !isDisplayingTable"
          >Cancel</el-button
        >
        <el-button
          @click="addToCart"
          class="el-button-bg"
          v-if="drawerShowCurrentItem('isInStock')"
          >Add To Cart</el-button
        >
        <el-button type="danger" disabled v-else>Not in stock</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import { useActivityStore } from "@/store/activityStore";

import CountdownTimer from "./CountdownTimer.vue";
import MenuTest from "./MenuTest.vue";

import { reactive, ref } from "vue";
import { ElDrawer, ElMessageBox } from "element-plus";
import { ElNotification } from "element-plus";
import "element-plus/dist/index.css";

export default {
  name: "ProductsList",
  props: ["products", "isDisplayed"],
  components: { CountdownTimer, MenuTest },

  data() {
    return {
      cartItemsAmount: this.cartItemsAmount,
      showModal: false,
      productName: "",
      productImageUrl: "",
      productId: "",
      isInStock: null,

      // deal section
      dealProductId: null,
      dealName: "",
      dealPrice: 0,
      dealOldPrice: 0,
      dealDescription: "",
      dealImageUrl: "",
      // modal section element-plus
      quantity: 1,
      isDisplayingTable: false,
      gridData: [],
      currentProduct: [], // contains the current product.
    };
  },

  methods: {
    passCurrentProductToDrawer(product) {
      this.currentProduct = product;
    },

    drawerShowCurrentItem(string) {
      const productObject = this.currentProduct;
      const objectKeysArray = Object.keys(productObject);
      // iterating through array of object keys
      if (string == "images") {
        return productObject["images"][0];
      }
      for (let i = 0; i <= objectKeysArray.length - 1; i++) {
        if (string == objectKeysArray[i]) {
          // returning the value of the key if equal to the string provided
          return productObject[objectKeysArray[i]];
        }
      }
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

    async addToCart() {
      const authStore = useAuthStore();

      const productId = this.currentProduct._id;
      const quantity = this.quantity;

      const data = {
        productId: productId,
        quantity: quantity,
      };

      const response = await axios.post(
        `/api/users/${authStore.user.id}/cart`,
        data
      );

      const cartItemsAmount = response.data.user.cartItems.length;
      if (response.data.success) {
        return (
          authStore.setCartItemsAmount(cartItemsAmount),
          (this.isDisplayingTable = false),
          (this.showAlert = true),
          (this.alert_title = "Success!"),
          (this.alert_description = response.data.success),
          (this.alert_type = "success"),
          ElNotification({
            title: this.alert_title,
            message: this.alert_description,
            type: "success",
            duration: 3000,
          })
        );
      } else {
        return (
          (this.showAlert = true),
          (this.alert_title = "Error!"),
          (this.alert_description = response.data.error),
          (this.alert_type = "error"),
          ElNotification({
            title: this.alert_title,
            message: this.alert_description,
            type: "error",
            duration: 3000,
          })
        );
      }
    },
    // openModal() {
    //   loading.value = true;
    //   setTimeout(() => {
    //     loading.value = false;
    //     dialog.value = false;
    //   }, 400);
    // },

    // handleClose() {
    //   if (loading.value) {
    //     return;
    //   }
    //   ElMessageBox.confirm("Do you want to submit?")
    //     .then(() => {
    //       loading.value = true;
    //       timer = setTimeout(() => {
    //         done();
    //         setTimeout(() => {
    //           loading.value = false;
    //         }, 400);
    //       }, 2000);
    //     })
    //     .catch(() => {
    //       // catch error
    //     });
    // },
    // handleClose() {
    //   loading.value = false;
    //   dialog.value = false;
    //   clearTimeout(timer);
    // },
  },

  watch: {
    userId: {
      immediate: true,
      async handler(newUserId, oldUserId) {
        // Only reset and track activity if the userId has changed
        if (newUserId !== oldUserId) {
          useActivityStore.resetTracking();
        }
      },
    },
  },
  async created() {
    const authStore = useAuthStore();
    const activityStore = useActivityStore();
    await activityStore.trackUserActivity(authStore.user.id);
    const cartItemsResponse = await axios.get(
      `/api/users/${authStore.user.id}/cart`
    );

    this.gridData = cartItemsResponse.data;

    const dealResponse = await axios.get("/api/deal");
    // this.name = response.data.name;
    this.dealProductId = dealResponse.data._id;
    this.dealName = dealResponse.data.name;
    this.dealPrice = dealResponse.data.price;
    this.dealOldPrice = dealResponse.data.oldPrice;
    this.dealDescription = dealResponse.data.description;
    this.dealImageUrl = dealResponse.data.imageUrl;
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
@import "../assets/css/text-flicker-in-grow.css";

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
.deal-area {
  position: relative;
  width: 100%;
  padding: 95px 0 100px; /* Ensure padding matches your design */
  overflow: hidden; /* Ensure no overflow from pseudo-element */
}

.deal-area::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://images7.alphacoders.com/592/thumb-1920-592678.jpg");
  background-size: cover;
  background-position: center;
  z-index: -2; /* Place behind the content */
  animation: zoom-in-out-deal 40s infinite;
}

.deal-area::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Black overlay with 50% opacity */
  z-index: -1; /* Place above the background image but below the content */
}

.deal-content {
  position: relative;
  color: white;
}

@keyframes zoom-in-out-deal {
  0% {
    background-size: 150%; /* Initial size */
  }
  50% {
    background-size: 200%; /* Zoom in at the halfway point */
  }
  100% {
    background-size: 150%; /* Zoom out back to original size */
  }
}

.product-area {
  padding-bottom: 100px;
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

.ti-plus-a > .el-button {
  border: none;
}

.ti-shopping-cart-a {
  cursor: pointer;
}

.ti-shopping-cart-a > .el-button {
  border: none;
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

/* drawer section */
.drawer-adding-product {
  width: 100%;
  height: 200px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  flex-direction: row;
}

.drawer-adding-data {
  width: 20%;
  margin-left: 30px;
}

.drawer-adding-data-prices {
  display: flex;
  align-items: center;
  justify-content: center;
}

.drawer-adding-data-quantity {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-plus-minus {
  width: auto;
  border-radius: 20px;
}

.form-control {
  border: none;
  text-align: center;
  pointer-events: none;
  margin: 0;
  padding: 0;
  height: 100%;
}

.input-group-text {
  border: none;
  cursor: pointer;
  background-color: #fff;
}

.prevent-select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

.drawer-adding-data-name {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 500;
}

.drawer-adding-product img {
  object-fit: fill;
}

.drawer-new-price {
  color: #686868;
  font-size: 20px;
  font-weight: 500;
  margin: 0 12px 0 0;
}

.drawer-old-price {
  color: #7e4c4f;
  font-size: 20px;
  font-weight: 500;
  text-decoration: line-through;
}

/* drawer layout */
.el-row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 100px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.el-button-bg {
  color: white;
  background: #7e4c4f;
}

@media screen and (max-width: 700px) {
  .deal-area {
    background: url("https://i.pinimg.com/736x/bb/54/3f/bb543feec97c5d66dfd0551d55034032.jpg");
  }
}
</style>
