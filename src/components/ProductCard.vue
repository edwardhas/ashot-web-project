<template>
  <div class="product-wrapper mb-10">
    <div class="product-img">
      <a href="">
        <router-link :to="{ path: `/products/${product._id}` }">
          <img class="custom-image" :src="product.images[0]" alt="" />
        </router-link>
      </a>

      <div class="product-action" v-if="!isAdmin">
        <router-link :to="{ path: `/products/${product._id}` }">
          <a
            class="ti-plus-a"
            title="Quick View"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            <el-button text class="ti-plus"></el-button>
          </a>
        </router-link>

        <a class="ti-shopping-cart-a" title="Add To Cart">
          <el-button
            text
            @click="isDisplayingTable = true"
            class="ti-shopping-cart"
          ></el-button>
        </a>
      </div>
      <div class="product-action" v-else>
        <router-link :to="{ path: `/products/${product._id}` }">
          <a class="ti-plus-a" title="Edit">
            <el-button text class="ti-plus"></el-button>
          </a>
        </router-link>
      </div>
    </div>
    <div class="product-content">
      <h4>
        <router-link :to="{ path: `/products/${product._id}` }">
          <a href="">{{ product.name }}</a>
        </router-link>
      </h4>
      <div class="product-price">
        <span class="new">${{ product.price }}.00</span>
        <span class="old" v-if="product.oldPrice"
          >${{ product.oldPrice }}.00</span
        >
        <el-tag v-if="isRecent" type="success"> NEW </el-tag>
      </div>
    </div>
  </div>
  <Drawer
    :product="product"
    v-model="isDisplayingTable"
    @close-drawer="closeDrawer"
  />
</template>

<script setup>
import { ref } from "vue";
import Drawer from "./Drawer.vue";

const props = defineProps({
  product: {
    _id: String,
    name: String,
    price: String,
    oldPrice: String,
    images: Array,
  },
  isRecent: Boolean,
  isAdmin: Boolean,
});

const isDisplayingTable = ref(false);

const closeDrawer = () => {
  isDisplayingTable.value = false;
};
</script>

<style scoped>
.product-area {
  padding-bottom: 100px;
}

.product-action a {
  text-decoration: none;
}

.custom-empty-products-list {
  display: flex;
  justify-content: center;
}

.custom-image {
  aspect-ratio: 2.7/3;
}

.ti-plus-a {
  cursor: pointer;
}

.ti-plus-a > .el-button {
  border: none;
}

.ti-shopping-cart-a {
  cursor: pointer;
}

.ti-shopping-cart-a > .el-button {
  border: none;
}

@media screen and (max-width: 700px) {
  .product-action {
    display: none;
  }
}
</style>
