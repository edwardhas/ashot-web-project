<template>
  <Header />
  <div v-if="product && !product_id_error_message">
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
      product_id_error_message: null,
    };
  },
  components: { NotFoundPage, ProductsDetails, Header, Footer },
  async created() {
    const product = await getSingleProduct(this.$route.params.productId);
    if (product.error) {
      return (this.product_id_error_message = product.error);
    }
    this.product = product;
  },
};
</script>

<style></style>
