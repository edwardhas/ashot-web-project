<template>
  <Header />
  <div class="shop-area pt-100 pb-100 gray-bg">
    <div class="container">
      <div class="row flex-row-reverse">
        <div class="col-lg-9">
          <div class="shop-topbar-wrapper">
            <div class="product-sorting-wrapper">
              <div class="product-show shorting-style">
                <label
                  >Showing <span>1-20</span> of <span>100</span> Results</label
                >
                <span>Filter</span>
              </div>
            </div>
          </div>
          <div class="grid-list-product-wrapper">
            <div class="product-view product-grid">
              <!-- ProductCard here -->
              <div class="row" v-if="matchedProduct[0]">
                <div
                  class="product-width col-xl-3 col-lg-4 col-md-6 col-sm-2"
                  v-for="product in matchedProduct"
                  :key="product._id"
                >
                  <ProductCard :product="product" />
                </div>
              </div>
              <div class="row" v-else>
                <div
                  class="product-width col-xl-3 col-lg-4 col-md-6 col-sm-2"
                  v-for="product in products"
                  :key="product._id"
                >
                  <ProductCard :product="product" />
                </div>
              </div>

              <div class="pagination-style text-center mt-10">
                <ul>
                  <li>
                    <a href="#"><i class="icon-arrow-left"></i></a>
                  </li>
                  <li>
                    <a href="#">1</a>
                  </li>
                  <li>
                    <a href="#">2</a>
                  </li>
                  <li>
                    <a class="active" href="#"
                      ><i class="icon-arrow-right"></i
                    ></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="shop-sidebar">
            <div class="shop-widget">
              <h4 class="shop-sidebar-title">Search Products</h4>
              <div class="shop-search mt-25 mb-50">
                <form class="shop-search-form">
                  <input
                    type="text"
                    placeholder="Find a product..."
                    @input="handleProductSearch"
                  />
                  <button type="submit">
                    <i class="icon-magnifier"></i>
                  </button>
                </form>
              </div>
            </div>
            <div class="shop-widget">
              <h4 class="shop-sidebar-title">Filter By Price</h4>
              <div class="price_filter mt-10">
                <div id="slider-range"></div>
                <div class="price_slider_amount">
                  <div class="label-input">
                    <!-- <input
                      type="text"
                      id="amount"
                      name="price"
                      placeholder="Add Your Price"
                    /> -->
                    <!--  #7e4c4f -->
                    <el-slider
                      max="1000"
                      range
                      :show-tooltip="false"
                      class="filter-slider"
                      v-model="sliderValue"
                      @input="handlePriceSearch(sliderValue)"
                    />
                    <label
                      >price :
                      <span style="font-size: smaller"
                        >${{ sliderValue[0] }} - ${{ sliderValue[1] }}</span
                      ></label
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="shop-widget mt-50">
              <h4 class="shop-sidebar-title">Generation</h4>
              <div class="shop-list-style mt-20">
                <ul v-for="generation in generationCategory" :key="generation">
                  <li class="mt-10">
                    <a href="#">{{ generation }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="shop-widget mt-50">
              <h4 class="shop-sidebar-title">Type</h4>
              <div class="shop-list-style mt-20">
                <ul v-for="type in typeCategory" :key="type">
                  <li>
                    <a href="#">{{ type }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="shop-widget mt-50">
              <h4 class="shop-sidebar-title">Health Consideration</h4>
              <div class="shop-list-style mt-20">
                <ul>
                  <li>
                    <a href="#">Bone Development <span>18</span></a>
                  </li>
                  <li>
                    <a href="#">Digestive Care <span>22</span></a>
                  </li>
                  <li>
                    <a href="#">General Health <span>19</span></a>
                  </li>
                  <li>
                    <a href="#">Hip & Joint <span>41</span></a>
                  </li>
                  <li>
                    <a href="#">Immune System <span>22</span></a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="shop-widget mt-50">
              <h4 class="shop-sidebar-title">Nutritional Option</h4>
              <div class="shop-list-style mt-20">
                <ul>
                  <li>
                    <a href="#">Grain Free <span>18</span></a>
                  </li>
                  <li>
                    <a href="#">Natural <span>22</span></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import axios from "axios";
import { ElNotification } from "element-plus";
import "element-plus/dist/index.css";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import ProductCard from "@/components/ProductCard.vue";

let products = ref([]); // contains all products
let generationCategory = [
  "Gen. I",
  "Gen. II",
  "Gen. III",
  "Gen. IV",
  "Gen. V",
  "Gen. VI",
  "Gen. VII",
  "Gen. VIII",
  "Gen. IX",
]; // contains all generations
let typeCategory = [
  "Normal",
  "Fairy",
  "Flying",
  "Ground",
  "Poison",
  "Steel",
  "Dark",
  "Fighting",
  "Ghost",
  "ICE",
  "Psychic",
  "Water",
  "Dragon",
  "Fire",
  "Grass",
  "Rock",
  "Bug",
]; // contains all generations

let sliderValue = ref([0, 1000]);
let matchedProduct = ref([]); // matched products from different searches

let productInput = ref("");
let priceInput = ref([]);

const handleProductSearch = (event) => {
  productInput.value = event.target.value;
  const productsArray = products.value;
  matchedProduct.value = productsArray.filter((obj) =>
    obj.name.includes(productInput.value)
  );
};

const handlePriceSearch = (price) => {
  priceInput.value = price;
  const productsArray = products.value;
  matchedProduct.value = productsArray.filter(
    (obj) =>
      obj.price >= priceInput.value[0] && obj.price <= priceInput.value[1]
  );
  console.log(matchedProduct.value);
};

onBeforeMount(async () => {
  try {
    const response = await axios.get("/api/products");
    products.value = response.data.products;
  } catch (error) {
    ElNotification({
      title: "Error! ",
      message: error.message,
      type: "danger",
      duration: 3000,
    });
  }
});
</script>

<style scoped>
a {
  text-decoration: none;
}

.filter-slider {
  margin-left: 15px;
  width: 250px;
  /* background-color: #7e4c4f; */
}
</style>
