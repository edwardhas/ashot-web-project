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
                  <button type="button">
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
              <div
                class="panel-heading shop-sidebar-title"
                @click="toggleGenerationView = !toggleGenerationView"
              >
                <h5 class="panel-title">
                  <span>
                    <el-icon><ArrowRight /></el-icon>
                  </span>
                  <a style="cursor: pointer">Generation </a>
                </h5>
              </div>

              <transition name="slide-fade">
                <div class="shop-list-style mt-20" v-if="toggleGenerationView">
                  <ul
                    v-for="generation in generationCategory"
                    :key="generation.prop"
                  >
                    <li
                      class="mt-10"
                      style="
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                      "
                    >
                      <el-checkbox
                        v-model="generation.value"
                        size="medium"
                        style="margin-right: 15px"
                        @change="handleCategorySearch"
                      />
                      <a
                        class="prevent-select"
                        @click="
                          (generation.value = !generation.value),
                            handleCategorySearch()
                        "
                        style="cursor: pointer"
                      >
                        {{ generation.prop }}
                      </a>
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
            <div class="shop-widget mt-50">
              <h4 class="shop-sidebar-title">Type</h4>
              <div class="shop-list-style mt-20">
                <ul v-for="type in typeCategory" :key="type.prop">
                  <li
                    style="
                      display: flex;
                      flex-direction: row;
                      align-items: center;
                    "
                  >
                    <el-checkbox
                      v-model="type.value"
                      size="medium"
                      style="margin-right: 15px"
                      @change="handleCategorySearch"
                    />
                    <a
                      class="prevent-select"
                      style="cursor: pointer"
                      @click="
                        (type.value = !type.value), handleCategorySearch()
                      "
                    >
                      {{ type.prop }}
                    </a>
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
import { ref, reactive, onBeforeMount, computed } from "vue";
import axios from "axios";
import { ElNotification } from "element-plus";
import "element-plus/dist/index.css";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import ProductCard from "@/components/ProductCard.vue";
import { ArrowRight } from "@element-plus/icons-vue";

let products = ref([]); // contains all products

const toggleGenerationView = ref(false);

const generationCategory = reactive([
  { prop: "I", value: false },
  { prop: "II", value: false },
  { prop: "III", value: false },
  { prop: "IV", value: false },
  { prop: "V", value: false },
  { prop: "VI", value: false },
  { prop: "VII", value: false },
  { prop: "VIII", value: false },
  { prop: "IX", value: false },
]);
const typeCategory = reactive([
  { prop: "Normal", value: false },
  { prop: "Fairy", value: false },
  { prop: "Flying", value: false },
  { prop: "Ground", value: false },
  { prop: "Poison", value: false },
  { prop: "Steel", value: false },
  { prop: "Dark", value: false },
  { prop: "Fighting", value: false },
  { prop: "Ghost", value: false },
  { prop: "ICE", value: false },
  { prop: "Psychic", value: false },
  { prop: "Water", value: false },
  { prop: "Dragon", value: false },
  { prop: "Fire", value: false },
  { prop: "Grass", value: false },
  { prop: "Rock", value: false },
  { prop: "Bug", value: false },
]);

let sliderValue = ref([0, 1000]);
let matchedProduct = ref([]); // matched products from different searches

let productInput = ref("");
let priceInput = ref([]);

const categoryObjSet = ref(new Set());

const handleProductSearch = (event) => {
  productInput.value = event.target.value;
  const productsArray = products.value;
  console.log(event.target.value);
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
};

const handleCategorySearch = () => {
  categoryObjSet.value.clear();

  generationCategory.forEach((generation) => {
    if (generation.value) categoryObjSet.value.add(generation.prop);
  });

  typeCategory.forEach((type) => {
    if (type.value) categoryObjSet.value.add(type.prop);
  });
};

const filteredProductsByCategory = computed(() => {
  if (categoryObjSet.value.size === 0) return products.value;
  return (matchedProduct.value = products.value.filter((product) => {
    return (
      categoryObjSet.value.has(product.generation) ||
      categoryObjSet.value.has(product.type)
    );
  }));
});

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

/* Transition styles for slide and fade */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 1s ease, transform 1s ease, height 1s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  height: 0;
}

.slide-fade-leave-from,
.slide-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
  height: auto;
}

.filter-slider {
  margin-left: 15px;
  width: 250px;
  /* background-color: #7e4c4f; */
}

.prevent-select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

:deep(.el-slider__runway) {
  background-color: #e0e0e0 !important; /* Background of the entire slider */
}

:deep(.el-slider__bar) {
  background-color: #7e4c4f !important; /* Active portion of the slider */
}

:deep(.el-slider__button) {
  background-color: #9b6065 !important; /* Thumb background color */
  border-color: #7e4c4f !important; /* Thumb border color */
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease, height 0.8s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  height: 0;
}

.slide-fade-leave-from,
.slide-fade-enter-to {
  opacity: 1;
  transform: translateY(0);
  height: auto;
}
</style>
