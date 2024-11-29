<template>
  <div class="product-area adding-deleting-area pt-95 pb-70 gray-bg">
    <div class="container">
      <div class="row" v-if="products[0]">
        <div
          class="col-xl-3 col-lg-4 col-md-6 col-sm-2"
          v-for="product in products"
          :key="product._id"
        >
          <product-card :product="product" :isAdmin="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ProductCard from "./ProductCard.vue";
import axios from "axios";

const products = ref([]);

onMounted(async () => {
  const response = await axios.get("/api/products");
  products.value = response.data.products;
});
</script>

<style></style>
