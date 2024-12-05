<template>
  <Header />

  <div v-if="isLoading">
    <el-skeleton style="width: 100%; height: 100%" variant="image" animated>
      <template #template>
        <el-skeleton-item variant="image" style="width: 100%; height: 450px" />
      </template>
    </el-skeleton>

    <!-- LAYOUT FOR CART -->
    <div class="cart-page">
      <!-- Skeleton Table -->
      <el-skeleton animated>
        <template #template>
          <table class="cart-table">
            <thead>
              <tr>
                <!-- Skeleton headings -->
                <th>
                  <el-skeleton-item
                    variant="text"
                    style="width: 120px; height: 25px"
                  ></el-skeleton-item>
                </th>
                <th>
                  <el-skeleton-item
                    variant="text"
                    style="width: 200px; height: 25px"
                  ></el-skeleton-item>
                </th>
                <th>
                  <el-skeleton-item
                    variant="text"
                    style="width: 150px; height: 25px"
                  ></el-skeleton-item>
                </th>
                <th>
                  <el-skeleton-item
                    variant="text"
                    style="width: 80px; height: 25px"
                  ></el-skeleton-item>
                </th>
                <th>
                  <el-skeleton-item
                    variant="text"
                    style="width: 150px; height: 25px"
                  ></el-skeleton-item>
                </th>
                <th>
                  <el-skeleton-item
                    variant="text"
                    style="width: 80px; height: 25px"
                  ></el-skeleton-item>
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Repeat this row for placeholders -->
              <tr v-for="n in 3" :key="n">
                <td>
                  <el-skeleton-item
                    variant="image"
                    style="width: 150px; height: 150px"
                  ></el-skeleton-item>
                </td>
                <td>
                  <el-skeleton-item
                    variant="text"
                    style="width: 300px; height: 30px"
                  ></el-skeleton-item>
                </td>
                <td>
                  <el-skeleton-item
                    variant="text"
                    style="width: 180px; height: 30px"
                  ></el-skeleton-item>
                </td>
                <td>
                  <el-skeleton-item
                    variant="rect"
                    style="width: 80px; height: 50px"
                  ></el-skeleton-item>
                </td>
                <td>
                  <el-skeleton-item
                    variant="text"
                    style="width: 180px; height: 30px"
                  ></el-skeleton-item>
                </td>
                <td>
                  <el-skeleton-item
                    variant="rect"
                    style="width: 40px; height: 40px"
                  ></el-skeleton-item>
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </el-skeleton>

      <!-- Skeleton Summary Section -->
      <div class="cart-summary">
        <div class="summary-details">
          <el-skeleton animated>
            <template #template>
              <div class="summary-row">
                <el-skeleton-item
                  variant="text"
                  style="width: 200px; height: 30px"
                ></el-skeleton-item>
                <el-skeleton-item
                  variant="text"
                  style="width: 100px; height: 30px"
                ></el-skeleton-item>
              </div>
              <div class="summary-row">
                <el-skeleton-item
                  variant="text"
                  style="width: 200px; height: 30px"
                ></el-skeleton-item>
                <el-skeleton-item
                  variant="text"
                  style="width: 150px; height: 30px"
                ></el-skeleton-item>
              </div>
            </template>
          </el-skeleton>
        </div>
        <div class="actions">
          <el-skeleton animated>
            <template #template>
              <el-skeleton-item
                variant="rect"
                style="width: 300px; height: 60px"
              ></el-skeleton-item>
            </template>
          </el-skeleton>
        </div>
      </div>
    </div>
  </div>

  <ShoppingCartList
    v-else
    @remove-from-cart="removeFromCart($event)"
    :cartItems="cartItems"
  />

  <Footer />
</template>

<script>
import ShoppingCartList from "@/components/ShoppingCartList.vue";
import Footer from "../components/Footer.vue";
import axios from "axios";
import { getCartItems } from "../db_queries";
import Header from "../components/Header.vue";
import { useAuthStore } from "@/store/authStore";
import { ElNotification } from "element-plus";
import "element-plus/dist/index.css";

export default {
  data() {
    return {
      cartItems: [],
      cartItemsAmount: 0,
      isLoading: true,
    };
  },
  components: { ShoppingCartList, Header, Footer },
  methods: {
    async removeFromCart(productId) {
      const authStore = useAuthStore();

      const response = await axios.delete(
        `/api/users/${authStore.user.id}/cart/${productId}`
      );
      const updatedCart = response.data.populatedCart;
      const cartItemsAmount = response.data.user.cartItems.length;

      this.cartItems = updatedCart;
      authStore.setCartItemsAmount(cartItemsAmount);
      // cartItems.value = cartItems.value.filter((item) => item !== productId);
      this.cartItems = this.cartItems.filter(
        (item) => item.productId !== productId
      );
      ElNotification({
        title: "Success!",
        message: "Product was successfuly removed",
        type: "success",
        duration: 3000,
      });
    },
  },

  async created() {
    const authStore = useAuthStore();
    try {
      const cartItems = await getCartItems(authStore.user.id);
      cartItems.forEach((element) => {
        element.images = element.images[0];
      });
      this.cartItems = cartItems;
    } catch (error) {
      ElNotification({
        title: "Error!",
        message: "Error occured when loading items",
        type: "danger",
        duration: 3000,
      });
    } finally {
      this.isLoading = false;
    }

    return (this.cartItemsAmount = this.cartItems.length);
  },
};
</script>

<style>
.cart-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  min-height: 100vh;
  background-color: #f9f9f9;
}

.cart-table {
  width: 100%; /* Full width */
  max-width: 1400px; /* Increased max width */
  border-collapse: collapse;
  margin: 0 auto;
  background: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.cart-table th,
.cart-table td {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #eee;
  font-size: 18px; /* Larger font size */
}

.cart-table th {
  background-color: #f5f5f5;
}

.cart-summary {
  width: 100%; /* Match table width */
  max-width: 1400px;
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.summary-details {
  flex: 1;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.actions {
  margin-left: 40px;
}
</style>
