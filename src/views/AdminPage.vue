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
              @input="updateProductName($event.target.value, 'adding')"
            />

            <p>Place The Product Price Here</p>

            <input
              type="number"
              class="custom-edit-input"
              :value="productPrice"
              min="0"
              @input="updateProductPrice($event.target.value, 'adding')"
            />

            <p>Place The Product Old Price Here</p>

            <input
              type="number"
              class="custom-edit-input"
              :value="productOldPrice"
              min="0"
              @input="updateProductOldPrice($event.target.value, 'adding')"
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
              @input="updateProductDescription($event.target.value, 'adding')"
            />

            <p>Place The Product Image Link Here</p>

            <input
              class="custom-edit-input"
              :value="productImageUrl"
              @input="updateProductImageUrl($event.target.value, 'adding')"
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
  <div class="hr"></div>
  <!-- !! END OF ADDING-PRODUCT-SECTION -->
  <!-- !!  START OF DEAL OF THE WEEK PRODUCT SECTION -->

  <div class="deal-area bg-img pt-95 pb-100">
    <div class="container">
      <div class="section-title text-center mb-50">
        <h2>Deal of the Week Section</h2>
      </div>
      <div class="row">
        <div class="col-lg-6 col-md-6">
          <div class="deal-img wow fadeInLeft">
            <img v-if="dealProductImageUrl" :src="dealProductImageUrl" />
            <p v-else>
              Picture will be displayed here after you place the link in the
              corresponding field below
            </p>
          </div>
        </div>

        <div class="col-lg-6 col-md-6">
          <div class="deal-content">
            <h3>
              <a>{{ dealProductName }}</a>
            </h3>
            <div class="deal-pro-price">
              <span class="deal-old-price">${{ dealProductOldPrice }}.00 </span>
              <span>${{ dealProductPrice }}.00</span>
            </div>
            <p>
              {{ dealProductDescription }}
            </p>
            <div class="timer timer-style">
              <div data-countdown="2017/10/01"></div>
            </div>
            <div class="discount-btn mt-35">
              <a class="btn-style">SHOP NOW</a>
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
            :value="dealProductName"
            @input="updateProductName($event.target.value, 'deal')"
          />

          <p>Place The Product Price Here</p>

          <input
            type="number"
            class="custom-edit-input"
            :value="dealProductPrice"
            min="0"
            @input="updateProductPrice($event.target.value, 'deal')"
          />

          <p>Place The Product Old Price Here</p>

          <input
            type="number"
            class="custom-edit-input"
            :value="dealProductOldPrice"
            min="0"
            @input="updateProductOldPrice($event.target.value, 'deal')"
          />

          <p>Place The Product Description Here</p>

          <input
            class="custom-edit-input"
            :value="dealProductDescription"
            @input="updateProductDescription($event.target.value, 'deal')"
          />

          <p>Place The Product Image Link Here</p>

          <input
            class="custom-edit-input"
            :value="dealProductImageUrl"
            placeholder="URL goes here"
            @input="updateProductImageUrl($event.target.value, 'deal')"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="submit">
    <div class="product-list-action-left">
      <a
        @click="addBestDeal"
        class="addtocart-btn"
        href="#"
        title="Add to cart"
      >
        <i class="ion-bag"></i>
        Add To DataBase
      </a>
    </div>
  </div>

  <!-- !! END OF DEAL OF THE WEEK PRODUCT SECTION -->
  <!-- !!  START OF EMAILS SECTION -->
  <div class="product-area pt-95 gray-bg">
    <div class="container">
      <div class="section-title text-center mb-55">
        <h2>All emails section</h2>
      </div>
      <div class="row" v-if="emails[0]">
        <div class="row-xl-3 row-lg-4 row-md-6 row-sm-6">
          <div
            class="above-product-wrapper"
            v-for="email in emails"
            :key="email.id"
          >
            <div
              class="product-wrapper mb-10"
              v-for="eachEmail in email.emails"
              :key="eachEmail.id"
            >
              <div class="product-content">
                <h4>
                  <a>User ID: {{ email.id }}</a>
                </h4>
                <h4>
                  <a>Email ID: {{ eachEmail.id }}</a>
                </h4>
                <div class="product-price email-name-subject">
                  <span class="new"
                    >{{ eachEmail.fullname }} ({{ eachEmail.email }})</span
                  >
                  <span class="new subject">{{ eachEmail.subject }}</span>
                </div>
                <div class="product-price email-message">
                  <span class="new">{{ eachEmail.message }}</span>
                </div>
              </div>
              <div class="submit submit-emails">
                <div class="product-list-action-left">
                  <a
                    class="addtocart-btn"
                    href="https://mail.google.com/mail/u/0/#inbox?compose=new"
                    target="_blank"
                    title="Redirects to gmail.com"
                  >
                    <i class="ion-bag"></i>
                    Manual Reply
                  </a>
                </div>
                <div class="product-list-action-left">
                  <router-link
                    :to="{ path: `/admin/panel/${email.id}/${eachEmail.id}` }"
                  >
                    <a
                      class="addtocart-btn"
                      href="#"
                      title="Redirects to replying section"
                    >
                      <i class="ion-bag"></i>
                      Quick reply
                    </a>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="custom-empty-products-list" v-else>
        <h3>No emails at this moment</h3>
      </div>
    </div>
  </div>
  <!-- !!  END OF EMAILS SECTION -->
  <!-- !!  START OF PRODUCTS VIEWS/CHANGES SECTION -->
  <div class="product-area adding-deleting-area pt-95 pb-70 gray-bg">
    <div class="container">
      <div class="section-title text-center mb-55">
        <h4>Most Popular</h4>
        <h2>Recent Products</h2>
      </div>
      <div class="row" v-if="edit_delete_products[0]">
        <div
          class="col-xl-3 col-lg-4 col-md-6 col-sm-2"
          v-for="product in edit_delete_products"
          :key="product._id"
        >
          <div class="product-wrapper mb-10">
            <div class="product-img">
              <router-link
                :to="{
                  path: `/admin/panel/edit_delete_product/${product._id}`,
                }"
              >
                <a href="">
                  <img class="custom-image" :src="product.image" alt="" />
                </a>
              </router-link>

              <!-- "../assets/img/product/product-4.jpg" -->
            </div>
            <div class="product-content">
              <h4>
                <router-link
                  :to="{
                    path: `/admin/panel/edit_delete_product/${product._id}`,
                  }"
                >
                  <a href="">{{ product.name }}</a>
                </router-link>
                <h4 class="inStock" v-if="product.isInStock">In Stock</h4>
                <h4 class="outOfStock" v-else>Out Of Stock</h4>
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
  <!-- !!  END OF PRODUCTS VIEWS/CHANGES SECTION -->
</template>

<script>
import ValidationComponent from "@/components/ValidationComponent.vue";
import { getProducts } from "../db_queries";
import axios from "axios";

export default {
  name: "AdminPage",
  components: { ValidationComponent },
  data() {
    return {
      // start of adding product section
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
      // end of adding product section
      // start of the best deal of the week section
      dealProductName: "Product Name",
      dealProductDescription: "Product Description",
      dealProductPrice: 0,
      dealProductOldPrice: 0,
      dealProductImageUrl: null,
      // end of the best deal of the week section
      // start of the emails section
      emails: [],
      emailsTotal: [],
      // end of the emails section
      //start of adding/deleting products
      edit_delete_products: [],
      //end of adding/deleting products
    };
  },
  methods: {
    updateProductName(newValue, section) {
      if (section == "adding") return (this.productName = newValue);
      return (this.dealProductName = newValue);
    },
    updateProductDescription(newValue, section) {
      if (section == "adding") return (this.productDescription = newValue);
      return (this.dealProductDescription = newValue);
    },
    updateProductPrice(newValue, section) {
      if (section == "adding") return (this.productPrice = Number(newValue));
      return (this.dealProductPrice = Number(newValue));
    },
    updateProductOldPrice(newValue, section) {
      if (section == "adding") return (this.productOldPrice = Number(newValue));
      return (this.dealProductOldPrice = Number(newValue));
    },
    updateProductAvailability(option, event) {
      this[option] = event.target.checked;
      if (option === "inStock" && event.target.checked) {
        this.outOfStock = false;
      } else if (option === "outOfStock" && event.target.checked) {
        this.inStock = false;
      }
    },
    updateProductImageUrl(newValue, section) {
      if (section == "adding") return (this.productImageUrl = newValue);
      return (this.dealProductImageUrl = newValue);
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
      const productData = {
        name: this.productName,
        price: this.productPrice,
        oldPrice: this.productOldPrice,
        description: this.productDescription,
        isInStock: this.inStock,
        image: this.productImageUrl,
        quantity: this.quantity,
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

    async addBestDeal() {
      const dealData = {
        name: this.dealProductName,
        price: this.dealProductPrice,
        oldPrice: this.dealProductOldPrice,
        description: this.dealProductDescription,
        imageUrl: this.dealProductImageUrl,
      };

      await axios.post("/api/admin/deal/add", dealData);

      this.dealProductName = "Product Name";
      this.dealProductDescription = "Product Description";
      this.dealProductPrice = 0;
      this.dealProductOldPrice = 0;
      this.dealProductImageUrl = null;
    },
  },
  async created() {
    const response = await axios.get("/api/emails");
    const emails = response.data.emails;
    const emailsTotal = response.data.userEmailsTotal;
    this.emails = emails;
    this.emailsTotal = emailsTotal;

    const products = await getProducts();
    this.edit_delete_products = products;
  },
};
</script>

<style scoped>
@import "../assets/css/responsive.css";

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

.hr {
  width: 80%;
  height: 1px;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 100px;
  background: grey;
}

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
