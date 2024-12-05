<template>
  <Header />
  <div v-if="isLoading">
    <div class="recent-products">
      <!-- Section Title Skeleton -->
      <el-skeleton :rows="1">
        <template #template>
          <div class="skeleton-heading"></div>
        </template>
      </el-skeleton>

      <!-- Sub-title Skeleton -->
      <el-skeleton :rows="1">
        <template #template>
          <div class="skeleton-subheading"></div>
        </template>
      </el-skeleton>

      <!-- Products Grid -->
      <div class="products-grid">
        <el-skeleton v-for="n in 8" :key="n" rows="2">
          <template #template>
            <div class="product-card">
              <div class="product-image"></div>
              <div class="product-details">
                <div class="product-title"></div>
                <div class="product-price"></div>
              </div>
            </div>
          </template>
        </el-skeleton>
      </div>

      <!-- View More Button Skeleton -->
      <el-skeleton :rows="1" animated>
        <template #template>
          <div class="skeleton-button"></div>
        </template>
      </el-skeleton>
    </div>
  </div>
  <ProductsList
    v-else
    @add-to-cart="addToCart($event)"
    :cartItemsAmount="cartItemsAmount"
    :products="products"
  />
  <Footer />
</template>

<script>
import axios from "axios";
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import ProductsList from "../components/ProductsList.vue";
import { ElNotification } from "element-plus";
import { ElSkeleton } from "element-plus";

export default {
  data() {
    return {
      isLoading: true,
      products: [],
      cartItems: [],
      cartItemsAmount: 0,
    };
  },
  components: { ProductsList, Header, Footer, ElSkeleton, ElNotification },
  async created() {
    try {
      const products = await axios.get("/api/products");
      console.log(products);
      this.products = products.data.products;
    } catch (error) {
      ElNotification({
        title: "Error!",
        message: error.message,
        type: "error",
      });
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    async addToCart(productId) {
      // await axios.post(`/api/users/${store.state.user.id}/cart`, {
      //   productId: productId,
      // });
      // this.cartItemsAmount++;
      // store.commit("cartItemsAmount", this.cartItemsAmount);
      // EventBus.emit("add-to-cart", store.state.userCartItemsAmount);
    },
  },
};
</script>
<style scoped>
.recent-products {
  text-align: center;
  margin: 20px auto;
  max-width: 1200px;
}

.skeleton-heading {
  width: 50%;
  height: 24px;
  margin: 0 auto 10px auto;
  background-color: #e0e0e0;
  border-radius: 4px;
}

.skeleton-subheading {
  width: 40%;
  height: 20px;
  margin: 0 auto 30px auto;
  background-color: #e0e0e0;
  border-radius: 4px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.product-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
}

.product-image {
  width: 200px;
  height: 230px;
  background-color: #e0e0e0;
  margin-bottom: 10px;
  border-radius: 4px;
}

.product-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-title {
  width: 80%;
  height: 20px;
  background-color: #e0e0e0;
  margin-bottom: 5px;
  border-radius: 4px;
}

.product-price {
  width: 60%;
  height: 16px;
  background-color: #e0e0e0;
  border-radius: 4px;
}

.skeleton-button {
  width: 20%;
  height: 40px;
  margin: 0 auto;
  background-color: #e0e0e0;
  border-radius: 20px;
}
</style>
