<template>
  <Header />
  <div v-if="product">
    <ProductsDetails :product="product" />
  </div>

  <div v-else>
    <NotFoundPage />
  </div>
  <Footer />
</template>

<script>
import NotFoundPage from "../views/NotFoundPage.vue";
import ProductsDetails from "../components/ProductsDetails.vue";
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import { getSingleProduct } from "../db_queries";

export default {
  name: "ProductDetailPage",

  data() {
    return {
      product: {},
    };
  },
  components: { NotFoundPage, ProductsDetails, Header, Footer },
  async created() {
    const product = await getSingleProduct(this.$route.params.productId);
    this.product = product;
  },
};
</script>

<style></style>
