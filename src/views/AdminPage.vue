<template>
  <div class="breadcrumb-area pt-95 pb-95 bg-img">
    <div class="container">
      <div class="breadcrumb-content text-center">
        <h2>Admin Panel</h2>
        <ul>
          <li class="active">Here You Can Add Products</li>
        </ul>
      </div>
    </div>
  </div>

  <ValidationComponentVue
    :page="page"
    :message="message"
    :status="status"
    :isDisplayed="isDisplayed"
  />

  <div class="adding-product-section">
    <div class="section-title text-center mb-50 mt-90">
      <h2>Adding Products Section</h2>
    </div>

    <div class="shop-area pt-95 pb-100">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-6">
            <div class="product-details-img">
              <img v-if="productImageUrl" id="zoompro" :src="productImageUrl" />
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
                    href="#"
                    title="Add to cart"
                  >
                    <i class="ion-bag"></i>
                    Add to cart
                  </a>
                  <!-- Put v-else -->
                  <a
                    class="disabled addtocart-btn"
                    v-else
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

            <p>
              Select The Product Availability (Left -
              <span class="edit-span-in">In Stock</span>; Right -
              <span class="edit-span-out">Out Of Stock</span> )
            </p>

            <input
              class="custom-edit-input custom-edit-checkbox"
              type="checkbox"
              :checked="inStock"
              @change="updateProductAvailability('inStock', $event)"
            />

            <input
              class="custom-edit-input custom-edit-checkbox"
              type="checkbox"
              :checked="outOfStock"
              @change="updateProductAvailability('outOfStock', $event)"
            />

            <p>Place The Product Description Here</p>

            <input
              class="custom-edit-input"
              :value="productDescription"
              @input="updateProductDescription($event.target.value)"
            />

            <p>Place The Product Image Link Here</p>

            <input
              class="custom-edit-input"
              :value="productImageUrl"
              @input="updateProductImageUrl($event.target.value)"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="submit">
      <div class="product-list-action-left">
        <a
          @click="addToDataBase"
          class="addtocart-btn"
          href="#"
          title="Add to cart"
        >
          <i class="ion-bag"></i>
          Add To DataBase
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import ValidationComponent from "@/components/ValidationComponent.vue";
import axios from "axios";

export default {
  name: "AdminPage",
  components: { ValidationComponent },
  data() {
    return {
      productName: "Product Name",
      productDescription: "Product Description",
      productPrice: 0,
      productOldPrice: 0,
      quantity: 1,
      inStock: null,
      outOfStock: null,
      productImageUrl: null,
      page: "Admin",
      message: "",
      status: false,
      isDisplayed: false,
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
    updateProductImageUrl(newValue) {
      this.productImageUrl = newValue;
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

    async addToDataBase() {
      const isInStock = this.inStock ? true : false;

      const productData = {
        name: this.productName,
        price: this.productPrice,
        oldPrice: this.productOldPrice,
        description: this.productDescription,
        isInStock: isInStock,
        image: this.productImageUrl,
      };
      console.log(productData);
      const response = await axios.post("/api/admin/products/add", productData);
      const message = response.data.message;
      const errorMessage = response.data.error;

      // console.log(`This is the console log: ${message}`);
      // console.log(`This is the console log: ${errorMessage}`);

      this.productName = "Product Name";
      this.productDescription = "Product Description";
      this.productPrice = 0;
      this.productOldPrice = 0;
      this.inStock = null;
      this.outOfStock = null;
      this.productImageUrl = null;

      if (message == undefined)
        return (
          (this.message = errorMessage),
          (this.status = false),
          (this.isDisplayed = true)
        );

      return (
        (this.message = message),
        (this.status = true),
        (this.isDisplayed = true)
      );
    },
  },
};
</script>

<style scoped>
@import "../assets/css/responsive.css";

.breadcrumb-area {
  /* background-image: url(../assets/img/banner/banner-2.jpg); */
  /* aspect-ratio: 12/2; */
  background-image: url("https://wallpaperswide.com/download/amazing_asiatic_landscape_art-wallpaper-2732x768.jpg");
}

.section-title h2 {
  padding: 50px;
  font-weight: 400;
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
  width: 95%;
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
  font-size: 18px;
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
  font-size: 18px;
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

@media screen and (max-width: 700px) {
  .adding-product-section {
    border: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
}
</style>
