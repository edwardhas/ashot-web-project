<template>
  <Header />
  <ProductsList
    @add-to-cart="addToCart($event)"
    :cartItemsAmount="cartItemsAmount"
    :products="products"
  />
  <Footer />
</template>

<script>
import axios from "axios";
import EventBus from "../eventBus";
import ProductsList from "../components/ProductsList.vue";
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import { useAuthStore } from "@/store/authStore";

export default {
  data() {
    return {
      products: [],
      cartItems: [],
      cartItemsAmount: 0,
    };
  },
  components: { ProductsList, Header, Footer },
  async created() {
    const authStore = useAuthStore();
    // const products = await getProducts(store.state.user.id);
    const products = await axios.post("/api/products", {
      userId: authStore.user.id,
    });
    // const cartItems = await getCartItems(store.state.user.id);
    this.products = products.data.products;
    // this.cartItems = cartItems;

    // this.cartItemsAmount = cartItems.length;
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

<style></style>
