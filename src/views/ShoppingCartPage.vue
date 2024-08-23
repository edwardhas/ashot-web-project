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
import EventBus from "../eventBus";
import axios from "axios";
import { ref } from "vue";
import { deleteProductFromCart, getCartItems } from "../db_queries";
import Header from "../components/Header.vue";
import store from "../store/index";

export default {
  data() {
    return {
      cartItems: [],
      cartItemsAmount: 0,
    };
  },
  components: { ShoppingCartList, Header, Footer },
  methods: {
    async removeFromCart(productId) {
      const updatedCart = await deleteProductFromCart(
        store.state.user.id,
        productId
      );
      this.cartItems = updatedCart;
      // cartItems.value = cartItems.value.filter((item) => item !== productId);
      this.cartItems = this.cartItems.filter(
        (item) => item.productId !== productId
      );
      this.cartItemsAmount--;

      EventBus.emit("remove-from-cart", this.cartItemsAmount);
    },
    // handleUpdate(amount) {
    //   this.cartItemsAmount = amount;
    // },
  },

  async created() {
    const cartItems = await getCartItems(store.state.user.id);
    this.cartItems = cartItems;

    return (this.cartItemsAmount = this.cartItems.length);
  },
};
</script>

<style></style>
