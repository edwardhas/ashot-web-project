<template>
  <div class="breadcrumb-area pt-95 pb-95 bg-img">
    <div class="container">
      <div class="breadcrumb-content text-center">
        <h2>Editing Page</h2>
        <ul>
          <router-link :to="{ name: 'AdminPage' }">
            <li class="text-white"><a>Admin Page</a></li>
          </router-link>
          <li class="active">Editing Page</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="shop-area pt-95 pb-100">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-6">
          <div class="product-details-img">
            <img v-if="image" id="zoompro" :src="image" />
            <p v-else>The image will appear here once you place the link</p>
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <div class="product-details-content">
            <h2>{{ name }}</h2>
            <div class="product-price">
              <span class="new">${{ price }}.00 </span>
              <span class="old" v-if="oldPrice">${{ oldPrice }}.00</span>
            </div>
            <div class="in-stock">
              <span class="inStock" v-if="isInStock"
                ><i class="ion-android-checkbox-outline"></i> In Stock</span
              >
              <span class="outOfStock" v-else
                ><i class="ion-android-checkbox-outline"></i> Out Of Stock</span
              >
            </div>
            <p>{{ description }}</p>
            <div class="quality-wrapper mt-30 product-quantity">
              <label class="prevent-select">Qty: {{ quantity }}</label>
            </div>

            <div class="row">
              <div class="custom-row-wrap">
                <p>Update The Product Name Here</p>
                <input
                  class="custom-edit-input"
                  :value="name"
                  @input="updateProductName($event.target.value)"
                />

                <p>Update The Product Price Here</p>

                <input
                  type="number"
                  class="custom-edit-input"
                  :value="price"
                  min="0"
                  @input="updateProductPrice($event.target.value)"
                />

                <p>Update The Product Old Price Here</p>

                <input
                  type="number"
                  class="custom-edit-input"
                  :value="oldPrice"
                  min="0"
                  @input="updateProductOldPrice($event.target.value)"
                />

                <p>
                  Select The Product Availability (If checked -
                  <span class="edit-span-in">In Stock</span>; Not Checked -
                  <span class="edit-span-out">Out Of Stock</span> )
                </p>

                <input
                  class="custom-edit-input custom-edit-checkbox"
                  type="checkbox"
                  :checked="isInStock"
                  @change="updateInStock($event)"
                />

                <!-- <input
                  class="custom-edit-input custom-edit-checkbox"
                  type="checkbox"
                  :checked="isInStock"
                  @change="updateOutOfStock($event)"
                /> -->

                <p>Update The Product Description Here</p>

                <textarea
                  class="custom-edit-input"
                  rows="10"
                  :value="description"
                  @input="updateProductDescription($event.target.value)"
                />

                <p>Update The Product Quantity Here</p>

                <input
                  class="custom-edit-input"
                  :value="quantity"
                  min="0"
                  type="number"
                  @input="updateProductQuantity($event.target.value)"
                />

                <p>Update The Product Image Link Here</p>

                <input
                  class="custom-edit-input"
                  :value="image"
                  @input="updateProductImageUrl($event.target.value)"
                />
              </div>
            </div>

            <div class="product-list-action">
              <div class="product-list-action-left">
                <a
                  @click="submitChanges(product._id)"
                  class="addtocart-btn"
                  href="#"
                  title="Submit Change"
                >
                  <i class="ion-bag"></i>
                  Submit Changes
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-alert
      :class="[showAlert ? 'fixed-alert' : 'none-alert']"
      :title="alert_title"
      :type="alert_type"
      :description="alert_description"
      show-icon
      center
    />
  </div>
</template>

<script>
import axios from "axios";
import { ElAlert } from "element-plus";
import "element-plus/dist/index.css";

export default {
  data() {
    return {
      product: [],
      name: "",
      description: "",
      quantity: 0,
      price: 0,
      oldPrice: 0,
      image: null,
      outOfStock: null,
      inStock: null,
      isInStock: null,

      // Alert Section
      showAlert: false,
      alert_title: "",
      alert_type: "",
      alert_description: "",
    };
  },
  methods: {
    updateProductName(newValue) {
      return (this.name = newValue);
    },
    updateProductDescription(newValue) {
      return (this.description = newValue);
    },
    updateProductQuantity(newValue) {
      this.quantity = newValue;
    },
    updateProductPrice(newValue) {
      return (this.price = Number(newValue));
    },
    updateProductOldPrice(newValue) {
      return (this.oldPrice = Number(newValue));
    },
    updateProductAvailability(option, event) {
      // this[option] = event.target.checked;
      if (option == "inStock" && event.target.checked) {
        this.isInStock = true;
      } else if (option == "outOfStock" && event.target.checked) {
        this.isInStock = false;
      }
    },

    updateInStock(event) {
      // this[option] = event.target.checked;
      if (event.target.checked) {
        this.isInStock = true;
      } else {
        this.isInStock = false;
      }
    },

    updateOutOfStock(event) {
      // this[option] = event.target.checked;
      if (event.target.checked) {
        this.isInStock = true;
      } else {
        this.isInStock = false;
      }
    },

    updateProductImageUrl(newValue) {
      return (this.image = newValue);
    },

    async submitChanges(productId) {
      const data = {
        productName: this.name,
        productDescription: this.description,
        productQuantity: this.quantity,
        productPrice: this.price,
        productOldPrice: this.oldPrice,
        productImageUrl: this.image,
        productIsInStock: this.isInStock,
      };

      const response = await axios.post(
        `/api/admin/panel/edit_delete_product/${productId}`,
        data
      );

      if (response.data.success) {
        return (
          (this.showAlert = true),
          (this.alert_title = "Success!"),
          (this.alert_description = response.data.success),
          (this.alert_type = "success")
        );
      } else {
        return (
          (this.showAlert = true),
          (this.alert_title = "Error!"),
          (this.alert_description = response.data.error),
          (this.alert_type = "error")
        );
      }
    },
  },
  async created() {
    const productId = this.$route.params.productId;
    const response = await axios.get(
      `/api/admin/panel/edit_delete_product/${productId}`
    );
    const product = response.data;

    this.product = product;
    this.name = product.name;
    this.price = product.price;
    this.oldPrice = product.oldPrice;
    this.description = product.description;
    this.image = product.image;
    this.isInStock = product.isInStock;
    this.quantity = product.quantity;
  },
};
</script>

<style scoped>
.breadcrumb-area {
  width: 100%;
  /* background-image: url(../assets/img/banner/banner-2.jpg); */
  aspect-ratio: 9/2;
  /* filter: brightness(50%); */
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

.product-list-action-left a {
  text-decoration: none;
}

.inStock {
  color: rgb(34, 170, 46);
  font-family: sans-serif;
  font-size: 15px;
}

.outOfStock {
  color: #ff3131;
  font-family: sans-serif;
  font-size: 15px;
}

.edit-span-in {
  color: rgb(34, 170, 46);
  font-family: sans-serif;
  font-size: 16px;
}
.edit-span-out {
  color: #ff3131;
  font-family: sans-serif;
  font-size: 16px;
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
</style>
