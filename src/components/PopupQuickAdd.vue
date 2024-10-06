<template>
  <div class="overlay show">
    <div class="popup">
      <h2>{{ productName }}</h2>
      <div class="details-modal-content"></div>
      <a class="close" @click="toggleModal">&times;</a>
      <div class="content">
        <img :src="productImageUrl" alt="" />

        <div class="quality-wrapper mt-30 product-quantity ml-60">
          <div class="in-stock">
            <span class="inStock" v-if="productIsInStock"
              ><i class="ion-android-checkbox-outline"></i> In Stock</span
            >
            <span class="outOfStock" v-else
              ><i class="ion-android-checkbox-outline"></i> Out Of Stock</span
            >
          </div>
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
          <!-- <p class="mt-30">Please select the amount</p> -->
          <div class="addtocart-btn btn" v-if="productIsInStock">
            <el-button plain @click="addToCart"> Submit </el-button>
          </div>
          <div class="addtocart-btn btn" v-else>
            <el-button class="prohibited-btn" disabled> Submit </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <el-alert
    :class="[showAlert ? 'fixed-alert' : 'none-alert']"
    :title="alert_title"
    :type="alert_type"
    :description="alert_description"
    show-icon
    center
  /> -->
</template>

<script>
import axios from "axios";
import { useAuthStore } from "@/store/authStore";
import EventBus from "../eventBus";

import { ElNotification } from "element-plus";
import "element-plus/dist/index.css";

export default {
  name: "popupQuickAdd",
  props: {
    toggleModal: {
      type: Function,
      required: true,
    },
    productImageUrl: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    productIsInStock: {
      type: Boolean,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      quantity: 1,
      cartItemsAmount: 0,

      // Alert Section
      showAlert: false,
      alert_title: "",
      alert_type: "",
      alert_description: "",
    };
  },
  methods: {
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
      const data = {
        productId: this.productId,
        quantity: this.quantity,
      };

      const response = await axios.post(
        `/api/users/${authStore.user.id}/cart`,
        data
      );
      EventBus.emit("add-to-cart", ++this.cartItemsAmount);

      if (response.data.success) {
        return (
          (this.showAlert = true),
          (this.alert_title = "Success!"),
          (this.alert_description = response.data.success),
          (this.alert_type = "success"),
          ElNotification({
            title: this.alert_title,
            message: this.alert_description,
            type: "success",
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
          })
        );
      }
    },
  },
  async created() {
    const authStore = useAuthStore();

    const response = await axios.get(`/api/users/${authStore.user.id}/cart`);
    const cartItems = response.data;

    this.cartItemsAmount = cartItems.length;
  },
};
</script>

<style scoped>
.prevent-select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
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

.overlay {
  display: none; /* Initially hidden */
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  opacity: 0;
}

.overlay.show {
  display: block; /* Show when the class is added */
  opacity: 1;
}

.content {
  display: flex;
  justify-content: flex-start;
}

.content img {
  align-self: center;
  width: 30%;
  height: 30%;
}

.details-modal-content {
  border-top: 1px solid #e0e0e0;
  padding: 2em;
  pointer-events: all;
  overflow: auto;
}

.outOfStock {
  color: #ff3131;
  font-family: sans-serif;
  font-size: 18px;
}

.inStock {
  color: rgb(34, 170, 46);
  font-family: sans-serif;
  font-size: 18px;
}

.disabled {
  cursor: not-allowed;
  pointer-events: none;
  background: grey;
  opacity: 0.5;
}

.popup {
  margin: 70px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: relative;
  transition: all 1s ease;
}

.popup h2 {
  display: flex;
  justify-content: center;
  margin-top: 0;
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
}

.popup .close {
  position: absolute;
  top: 20px;
  right: 30px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
  cursor: pointer;
}

.popup .close:hover {
  color: #06d85f;
}

.popup .content {
  max-height: 30%;
  overflow: auto;
}

.btn {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0;
}

.btn a:hover {
  color: white;
  background: #333;
}

.btn a {
  background-color: #7e4c4f;
  align-self: center;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  line-height: 1;
  padding: 12px 22px;
  text-transform: uppercase;
  transition: 0.7s;
}

/* Alert Section */
.fixed-alert {
  position: fixed;
  right: 20px; /* Distance from the right edge */
  bottom: 150px; /* Distance from the bottom edge */
  width: 300px; /* Set a fixed width for the alert */
  z-index: 9999; /* Ensure it's on top of other content */
}

.none-alert {
  display: none;
}

@media screen and (max-width: 700px) {
  .popup {
    width: 80%;
  }
}
</style>
