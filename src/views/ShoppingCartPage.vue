<template>
  <Header />
  <ShoppingCartList
    @remove-from-cart="removeFromCart($event)"
    :cartItems="cartItems"
  />
  <Footer />
</template>

<script>
import ShoppingCartList from "@/components/ShoppingCartList.vue";
import Footer from "../components/Footer.vue";
import axios from "axios";
import { ref } from "vue";
import { deleteProductFromCart, getCartItems } from "../db_queries";
import Header from "../components/Header.vue";
import { useAuthStore } from "@/store/authStore";
import { ElNotification, ElLoading } from "element-plus";
import "element-plus/dist/index.css";

export default {
  data() {
    return {
      cartItems: [],
      cartItemsAmount: 0,
      loading: true,
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
      console.log(cartItemsAmount);

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
    const loadingComponent = ElLoading.service({
      lock: true,
      text: "Loading...",
      background: "rgba(0, 0, 0, 0.8)",
    });

    if (!this.isLoading) {
      loadingComponent.close();
    }
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
      this.loading = false;
    }

    return (this.cartItemsAmount = this.cartItems.length);
  },
};
</script>

<style></style>
