<template>
  <!-- <el-button plain @click="dialogFormVisible = true">
    Open a Form nested Dialog
  </el-button> -->

  <el-dialog v-model="dialogFormVisible" title="Search" width="1000">
    <el-form>
      <el-form-item label="I am looking for...">
        <input type="text" class="search-input" @input="handleSearch" />
      </el-form-item>
    </el-form>

    <el-table
      :data="matchedProduct"
      style="width: 100%"
      v-if="matchedProduct.length > 0"
    >
      <el-table-column label="Image" width="160">
        <template #default="scope">
          <img
            :src="scope.row.images[0]"
            alt="Item Image"
            style="width: 100px; height: auto"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="price" label="Price" />
      <el-table-column prop="isInStock" label="Availablity" />
      <el-table-column label="View">
        <template #default="scope">
          <router-link :to="{ path: `/products/${scope.row._id}` }">
            <button class="button-17">View</button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const dialogFormVisible = ref(true);
const userInput = ref("");
const matchedProduct = ref([]);

const handleSearch = (event) => {
  userInput.value = event.target.value;
  const productsArray = products.value;
  matchedProduct.value = productsArray.filter((obj) =>
    obj.name.includes(userInput.value)
  );
};

const products = ref([]);

onMounted(async () => {
  try {
    const productsResponse = await axios.get("/api/products");
    const response = productsResponse.data.products;
    response.forEach((obj) => {
      obj.isInStock
        ? (obj.isInStock = "In Stock")
        : (obj.isInStock = "Not in Stock");
    });
    products.value = productsResponse.data.products;
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped>
.search-input {
  height: 30px;
}

.deal-style-white .btn-style {
  background-color: #fff;
  color: #7e4c4f;
  text-decoration: none;
}
/* CSS */
.button-17 {
  align-items: center;
  appearance: none;
  background-color: #7e4c4f;
  border-radius: 24px;
  border-style: none;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  fill: currentcolor;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 30px;
  justify-content: center;
  letter-spacing: 0.25px;
  line-height: normal;
  max-width: 100%;
  overflow: visible;
  padding: 2px 24px;
  position: relative;
  text-align: center;
  text-transform: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: auto;
  will-change: transform, opacity;
  z-index: 0;
  transition: 0.7s;
}

.button-17:hover {
  background: #fff;
  color: #7e4c4f;
}

/* .button-17:active {
  box-shadow: 0 4px 4px 0 rgb(60 64 67 / 30%),
    0 8px 12px 6px rgb(60 64 67 / 15%);
  outline: none;
} */

.button-17:focus {
  outline: none;
  border: 2px solid #4285f4;
}

/* .button-17:not(:disabled) {
  box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
    rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
}

.button-17:not(:disabled):hover {
  box-shadow: rgba(60, 64, 67, 0.3) 0 2px 3px 0,
    rgba(60, 64, 67, 0.15) 0 6px 10px 4px;
}

.button-17:not(:disabled):focus {
  box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
    rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
}

.button-17:not(:disabled):active {
  box-shadow: rgba(60, 64, 67, 0.3) 0 4px 4px 0,
    rgba(60, 64, 67, 0.15) 0 8px 12px 6px;
}

.button-17:disabled {
  box-shadow: rgba(60, 64, 67, 0.3) 0 1px 3px 0,
    rgba(60, 64, 67, 0.15) 0 4px 8px 3px;
} */
</style>
