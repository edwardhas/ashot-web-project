<template>
  <!-- <div class="breadcrumb-area pt-95 pb-95 bg-img">
    <div class="container">
      <div class="breadcrumb-content text-center">
        <h2>Admin Panel</h2>
        <ul>
          <li class="active">A Place Where You control It</li>
        </ul>
      </div>
    </div>
  </div> -->
  <BreadcrumbComponent
    :title="'Admin Page'"
    :subTitle="'A Place Where You Control It'"
  />

  <!-- !!  START OF DEAL OF THE WEEK PRODUCT SECTION -->

  <el-tabs v-model="activeTab" tab-position="top" class="demo-tabs">
    <el-tab-pane
      class="tab"
      label="Add Product"
      name="add-products"
    ></el-tab-pane>
    <el-tab-pane class="tab" label="Add Deal" name="add-deal"></el-tab-pane>
    <el-tab-pane
      class="tab"
      label="Reply Emails"
      name="manage-emails"
    ></el-tab-pane>
    <el-tab-pane
      class="tab"
      label="Manage Products"
      name="manage-products"
    ></el-tab-pane>
  </el-tabs>

  <AddingProductsComponent v-if="activeTab === 'add-products'" />

  <AddingDealComponent v-if="activeTab === 'add-deal'" />
  <!-- <div class="deal-section">
    <div class="deal-area bg-img pt-95 pb-100" v-if="activeTab === 'add-deal'">
      <div class="container">
        <div class="section-title text-center mb-50">
          <h2>Deal of the Week Section</h2>
        </div>
        <div class="row">
          <div class="col-lg-6 col-md-6">
            <div class="deal-img wow fadeInLeft">
              <img
                v-if="dealProductImageUrlOne"
                :src="dealProductImageUrlOne"
              />
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
                <span class="deal-old-price"
                  >${{ dealProductOldPrice }}.00
                </span>
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

    <div class="shop-area pt-95 pb-100" v-if="activeTab === 'add-deal'">
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

            <p>
              Place The Product Image Link Here (Only the first one shows up on
              this page)
            </p>

            <input
              class="custom-edit-input"
              :value="dealProductImageUrlOne"
              placeholder="URL goes here"
              @input="updateProductImageUrl($event.target.value, 'deal', 'one')"
            />
            <input
              class="custom-edit-input"
              :value="dealProductImageUrlTwo"
              placeholder="OK to leave blank"
              @input="updateProductImageUrl($event.target.value, 'deal', 'two')"
            />
            <input
              class="custom-edit-input"
              :value="dealProductImageUrlThree"
              placeholder="OK to leave blank"
              @input="
                updateProductImageUrl($event.target.value, 'deal', 'three')
              "
            />
            <input
              class="custom-edit-input"
              :value="dealProductImageUrlFour"
              placeholder="OK to leave blank"
              @input="
                updateProductImageUrl($event.target.value, 'deal', 'four')
              "
            />
            <input
              class="custom-edit-input"
              :value="dealProductImageUrlFive"
              placeholder="OK to leave blank"
              @input="
                updateProductImageUrl($event.target.value, 'deal', 'five')
              "
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="submit" v-if="activeTab === 'add-deal'">
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
  </div> -->

  <!-- !! END OF DEAL OF THE WEEK PRODUCT SECTION -->
  <!-- !!  START OF EMAILS SECTION -->
  <div class="product-area pt-95 gray-bg" v-if="activeTab === 'manage-emails'">
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
  <div
    class="product-area adding-deleting-area pt-95 pb-70 gray-bg"
    v-if="activeTab === 'manage-products'"
  >
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
import BreadcrumbComponent from "@/components/BreadcrumbComponent.vue";
import AddingProductsComponent from "@/components/AddingProductsComponent.vue";
import AddingDealComponent from "@/components/AddingDealComponent.vue";
import axios from "axios";

export default {
  name: "AdminPage",
  components: {
    BreadcrumbComponent,
    ValidationComponent,
    AddingProductsComponent,
    AddingDealComponent,
  },
  data() {
    return {
      activeTab: "add-products",
      // global active users amount variable
      activeUsers: 0,
      // start of adding product section
      // productName: "Product Name",
      // productDescription: "Product Description",
      // productPrice: 0,
      // productOldPrice: 0,
      // quantity: 1,
      // inStock: null,
      // outOfStock: null,
      // productImageUrlOne: null,
      // productImageUrlTwo: null,
      // productImageUrlThree: null,
      // productImageUrlFour: null,
      // productImageUrlFive: null,
      // productImages: [],
      // inputClass: "custom-edit-input",
      // page: "Admin",
      // message: "",
      // status: false,
      // isDisplayed: false,
      // end of adding product section
      // start of the best deal of the week section
      dealProductName: "Product Name",
      dealProductDescription: "Product Description",
      dealProductPrice: 0,
      dealProductOldPrice: 0,
      dealProductImageUrlOne: null,
      dealProductImageUrlTwo: null,
      dealProductImageUrlThree: null,
      dealProductImageUrlFour: null,
      dealProductImageUrlFive: null,
      dealImages: [],
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
    updateProductImageUrl(newValue, section, variable) {
      if (section == "adding") {
        if (variable == "one") {
          console.log(this.productImageUrlOne);
          return (this.productImageUrlOne = newValue);
        } else if (variable == "two")
          return (this.productImageUrlTwo = newValue);
        else if (variable == "three")
          return (this.productImageUrlThree = newValue);
        else if (variable == "four")
          return (this.productImageUrlFour = newValue);
        else if (variable == "five")
          return (this.productImageUrlFive = newValue);
      } else {
        if (variable == "one") {
          console.log(this.dealProductImageUrlOne);
          return (this.dealProductImageUrlOne = newValue);
        } else if (variable == "two")
          return (this.dealProductImageUrlTwo = newValue);
        else if (variable == "three")
          return (this.dealProductImageUrlThree = newValue);
        else if (variable == "four")
          return (this.dealProductImageUrlFour = newValue);
        else if (variable == "five")
          return (this.dealProductImageUrlFive = newValue);
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
      this.productImageUrlOne == null
        ? null
        : this.productImages.push(this.productImageUrlOne);
      this.productImageUrlTwo == null
        ? null
        : this.productImages.push(this.productImageUrlTwo);
      this.productImageUrlThree == null
        ? null
        : this.productImages.push(this.productImageUrlThree);
      this.productImageUrlFour == null
        ? null
        : this.productImages.push(this.productImageUrlFour);
      this.productImageUrlFive == null
        ? null
        : this.productImages.push(this.productImageUrlFive);

      return console.log(this.productImages);

      const productData = {
        name: this.productName,
        price: this.productPrice,
        oldPrice: this.productOldPrice,
        description: this.productDescription,
        isInStock: this.inStock,
        image: this.productImages,
        quantity: this.quantity,
      };

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
      this.productImageUrlOne = null;
      this.productImageUrlTwo = null;
      this.productImageUrlThree = null;
      this.productImageUrlFour = null;
      this.productImageUrlFive = null;

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
      this.dealProductImageUrlOne == null
        ? null
        : this.dealImages.push(this.dealProductImageUrlOne);
      this.dealProductImageUrlTwo == null
        ? null
        : this.dealImages.push(this.dealProductImageUrlTwo);
      this.dealProductImageUrlThree == null
        ? null
        : this.dealImages.push(this.dealProductImageUrlThree);
      this.dealProductImageUrlFour == null
        ? null
        : this.dealImages.push(this.dealProductImageUrlFour);
      this.dealProductImageUrlFive == null
        ? null
        : this.dealImages.push(this.dealProductImageUrlFive);

      const dealData = {
        name: this.dealProductName,
        price: this.dealProductPrice,
        oldPrice: this.dealProductOldPrice,
        description: this.dealProductDescription,
        imageUrls: this.dealImages,
      };

      await axios.post("/api/admin/deal/add", dealData);

      this.dealProductName = "Product Name";
      this.dealProductDescription = "Product Description";
      this.dealProductPrice = 0;
      this.dealProductOldPrice = 0;
      this.dealProductImageUrlOne = null;
      this.dealProductImageUrlTwo = null;
      this.dealProductImageUrlThree = null;
      this.dealProductImageUrlFour = null;
      this.dealProductImageUrlFive = null;
    },
  },
  async created() {
    const emails_response = await axios.get("/api/emails");
    const activeUsers_response = await axios.get(
      "/api/admin/page/users-active"
    );
    // working with emails_response
    const emails = emails_response.data.emails;
    const emailsTotal = emails_response.data.userEmailsTotal;
    this.emails = emails;
    this.emailsTotal = emailsTotal;

    // working with activeUsers_response
    const usersAmount = activeUsers_response.data.activeUsers;
    this.activeUsers = usersAmount;

    const products = await axios.get("/api/products");
    console.log(products.data);
    this.edit_delete_products = products.data;
  },
};
</script>

<style scoped>
@import "../assets/css/responsive.css";

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
  display: flex;
  width: 80%;
  margin-bottom: 30px;
  flex-wrap: wrap;
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

.demo-tabs {
  display: flex;
  align-items: center;
  height: 100%;
  margin-top: 50px;
}

/* end of adding/deleting products section */

@media screen and (max-width: 700px) {
  .adding-product-section {
    border: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }
  .demo-tabs {
    display: block;
    /* align-items: center;
    height: 100%; */
    margin-top: 50px;
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
