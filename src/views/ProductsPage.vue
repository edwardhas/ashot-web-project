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
import { getProducts, getCartItems } from "../db_queries";
import store from "../store/index";

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
    // const products = await getProducts(store.state.user.id);
    const products = await axios.post("/api/products", {
      userId: store.state.user.id,
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
