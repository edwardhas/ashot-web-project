<template>
  <div class="adding-product-section">
    <div class="section-title text-center mb-50 mt-90">
      <h2>Adding Products Section</h2>
    </div>

    <div class="shop-area pt-95 pb-100">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-6">
            <div class="product-details-img">
              <img
                v-if="productImageUrlOne"
                id="zoompro"
                :src="productImageUrlOne"
              />
              <p v-else>
                Picture will be displayed here after you place the link in the
                corresponding field below
              </p>
            </div>
          </div>
          <div class="col-lg-6 col-md-6">
            <div class="product-details-content">
              <h2>{{ productName }}</h2>

              <div class="product-price">
                <span class="new">${{ productPrice }}.00</span>
                <span class="old">${{ productOldPrice }}.00</span>
              </div>
              <div class="in-stock">
                <span class="inStock" v-if="inStock"
                  ><i class="ion-android-checkbox-outline"></i>In Stock</span
                >
                <span class="outOfStock" v-else
                  ><i class="ion-android-checkbox-outline"></i> Out Of
                  Stock</span
                >
              </div>
              <p>{{ productDescription }}</p>

              <div class="quality-wrapper mt-30 product-quantity">
                <label>Qty:</label>
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
                    @change="updateQuantity"
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
                  <!-- Chekc is is in stock-->
                  <a
                    v-if="inStock"
                    @click="addToCart"
                    class="addtocart-btn"
                    title="Add to cart"
                  >
                    <i class="ion-bag"></i>
                    Add to cart
                  </a>
                  <!-- Put v-else -->
                  <a class="disabled addtocart-btn" v-else title="Add to cart">
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

    <div class="shop-area pt-95 pb-100">
      <div class="container">
        <div class="row">
          <div class="custom-row-wrap">
            <p>Place The Product Name Here</p>
            <input
              class="custom-edit-input"
              :value="productName"
              @input="updateProductName($event.target.value)"
            />

            <p>Place The Product Price Here</p>

            <input
              type="number"
              class="custom-edit-input"
              :value="productPrice"
              min="0"
              @input="updateProductPrice($event.target.value)"
            />

            <p>Place The Product Old Price Here</p>

            <input
              type="number"
              class="custom-edit-input"
              :value="productOldPrice"
              min="0"
              @input="updateProductOldPrice($event.target.value)"
            />

            <p>Click if the product is in stock</p>

            <input
              class="custom-edit-input custom-edit-checkbox"
              type="checkbox"
              :checked="inStock"
              @change="updateProductAvailability('inStock', $event)"
            />

            <p>Place The Product Description Here</p>

            <textarea
              class="custom-edit-input"
              :value="productDescription"
              @input="updateProductDescription($event.target.value)"
            />

            <p>Place The Product Image Link Here</p>
            <!-- !! ADDING SECTION INPUTS -->
            <input
              :class="inputClass"
              :value="productImageUrlOne"
              placeholder="Primary URL"
              @input="updateProductImageUrl($event.target.value, 'one')"
            />
            <input
              :class="inputClass"
              :value="productImageUrlTwo"
              placeholder="OK to leave blank"
              @input="updateProductImageUrl($event.target.value, 'two')"
            />
            <input
              :class="inputClass"
              :value="productImageUrlThree"
              placeholder="OK to leave blank"
              @input="updateProductImageUrl($event.target.value, 'three')"
            />
            <input
              :class="inputClass"
              :value="productImageUrlFour"
              placeholder="OK to leave blank"
              @input="updateProductImageUrl($event.target.value, 'four')"
            />
            <input
              :class="inputClass"
              :value="productImageUrlFive"
              placeholder="OK to leave blank"
              @input="updateProductImageUrl($event.target.value, 'five')"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="submit">
      <div class="product-list-action-left">
        <a @click="addProduct" class="addtocart-btn" href="#">
          <i class="ion-bag"></i>
          Add To DataBase
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ElNotification } from "element-plus";
export default {
  data() {
    return {
      productName: "Product Name",
      productDescription: "Product Description",
      productPrice: 0,
      productOldPrice: 0,
      quantity: 1,
      inStock: false,
      outOfStock: false,
      productImageUrlOne: "",
      productImageUrlTwo: "",
      productImageUrlThree: "",
      productImageUrlFour: "",
      productImageUrlFive: "",
      productImages: [],
      inputClass: "custom-edit-input",
    };
  },
  methods: {
    updateProductName(newValue) {
      this.productName = newValue;
    },
    updateProductDescription(newValue) {
      this.productDescription = newValue;
    },
    updateProductPrice(newValue) {
      this.productPrice = Number(newValue);
    },
    updateProductOldPrice(newValue) {
      this.productOldPrice = Number(newValue);
    },
    updateProductAvailability(option, event) {
      this[option] = event.target.checked;
      if (option === "inStock" && event.target.checked) {
        this.outOfStock = false;
      } else if (option === "outOfStock" && event.target.checked) {
        this.inStock = false;
      }
    },
    updateProductImageUrl(newValue, variable) {
      if (variable == "one") {
        this.productImageUrlOne = newValue;
        this.productImages.push(newValue);
      } else if (variable == "two") {
        this.productImageUrlTwo = newValue;
        this.productImages.push(newValue);
      } else if (variable == "three") {
        this.productImageUrlThree = newValue;
        this.productImages.push(newValue);
      } else if (variable == "four") {
        this.productImageUrlFour = newValue;
        this.productImages.push(newValue);
      } else if (variable == "five") {
        this.productImageUrlFive = newValue;
        this.productImages.push(newValue);
      }
    },

    manageQuantity(operation) {
      if (this.quantity > 0) {
        if (!operation) return this.quantity--;
        return this.quantity++;
      }
      if (this.quantity == 0) {
        if (!operation) return;
        return this.quantity++;
      }
    },

    async addProduct() {
      const data = {
        name: this.productName,
        description: this.productDescription,
        isInStock: this.inStock,
        price: this.productPrice,
        oldPrice: this.productOldPrice,
        images: this.productImages,
        quantity: this.quantity,
      };
      try {
        const response = await axios.post("/api/admin/products/add", data);
        if (response.data.success) {
          ElNotification({
            title: "Success! ",
            message: response.data.success,
            type: "success",
            duration: 3000,
          });
        } else {
          ElNotification({
            title: "Error! ",
            message: response.data.error,
            type: "danger",
            duration: 3000,
          });
        }
      } catch (error) {
        ElNotification({
          title: "Error! ",
          message: error.message,
          type: "danger",
          duration: 3000,
        });
      }
      this.productName = "Product Name";
      this.productDescription = "Product Description";
      this.productPrice = 0;
      this.productOldPrice = 0;
      this.quantity = 1;
      this.inStock = null;
      this.outOfStock = null;
      this.productImageUrlOne = "";
      this.productImageUrlTwo = "";
      this.productImageUrlThree = "";
      this.productImageUrlFour = "";
      this.productImageUrlFive = "";
      this.productImages = [];
    },
  },
};
</script>

<style scoped>
@import "../assets/css/responsive.css";

.section-title h2 {
  padding: 50px;
  font-weight: 400;
  text-transform: uppercase;
}

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

.adding-product-section {
  margin: 0 auto;
  width: 100%;
  /* border-radius: 20px;
  -webkit-box-shadow: 0px 0px 30px -17px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 30px -17px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 30px -17px rgba(0, 0, 0, 0.75); */
}

.custom-row-wrap input {
  flex-wrap: wrap;
}

.row p {
  display: flex;
  flex-wrap: wrap;
}

.product-details-content {
  display: flex;
  /* justify-content: center;
  align-content: center; */
  flex-direction: column;
  flex-wrap: wrap;
}

a {
  text-decoration: none;
}

.outOfStock {
  color: #ff3131;
  font-family: sans-serif;
  font-size: 15px;
}

.disabled {
  cursor: not-allowed;
  pointer-events: none;
  background: grey;
  opacity: 0.5;
}

.inStock {
  color: rgb(34, 170, 46);
  font-family: sans-serif;
  font-size: 15px;
}

.custom-edit-input {
  margin-bottom: 30px;
}

.custom-edit-checkbox {
  width: 100px;
}

.edit-span-in {
  color: rgb(34, 170, 46);
}

.edit-span-out {
  color: #ff3131;
}

.product-list-action-left {
  padding-bottom: 50px;
}

.submit {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-bottom: 100px;
}

.submit-emails {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  margin-bottom: 100px;
}

/* email section */

.custom-empty-products-list {
  display: flex;
  justify-content: center;
}

.email-message {
  margin-top: 20px;
}

.submit {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
}

.submit .product-list-action-left a {
  font-size: 11px;
}

.product-wrapper {
  width: 50%;
}

.above-product-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

/* end of email section */
/* start of adding/deleting products section */

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
/* end of adding/deleting products section */

@media screen and (max-width: 700px) {
  .adding-product-section {
    border: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
}

@media (max-width: 576px) {
  .product-wrapper {
    flex: 0 0 auto;
    flex-wrap: wrap;
    width: 100%;
  }
}
</style>
