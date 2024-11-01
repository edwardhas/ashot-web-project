<template>
  <el-drawer
    title="This is your Cart. You can add an item to it!"
    direction="rtl"
    size="50%"
    z-index="999"
  >
    <div class="drawer-adding-product">
      <img :src="drawerShowCurrentItem('images')" />
      <div class="drawer-adding-data">
        <div class="drawer-adding-data-name">
          <p>{{ drawerShowCurrentItem("name") }}</p>
        </div>

        <div class="drawer-adding-data-prices">
          <p>${{ drawerShowCurrentItem("price") }}.00</p>
        </div>

        <div class="drawer-adding-data-quantity">
          <div class="cart-plus-minus">
            <span
              class="input-group-text prevent-select"
              @click="manageQuantity(false)"
              >-</span
            >
            <input
              type="text"
              class="form-control prevent-select"
              v-model="quantity"
            />
            <span
              class="input-group-text prevent-select"
              @click="manageQuantity(true)"
              >+</span
            >
          </div>
        </div>
      </div>
    </div>

    <h3 style="display: flex; justify-content: center; margin-bottom: 50px">
      Your Cart
    </h3>
    <el-table :data="gridData">
      <el-table-column label="Image" width="100">
        <template #default="scope">
          <img
            :src="scope.row.images[0]"
            alt="Item Image"
            style="width: 100px; height: auto"
          />
        </template>
      </el-table-column>
      <el-table-column property="name" label="Name" width="200" />
      <el-table-column property="price" label="Price" />
      <el-table-column property="isInStock" label="Availability" />
    </el-table>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="isDisplayingTable = !isDisplayingTable"
          >Cancel</el-button
        >
        <el-button
          @click="addToCart"
          class="el-button-bg"
          v-if="drawerShowCurrentItem('isInStock')"
          >Add To Cart</el-button
        >
        <el-button type="danger" disabled v-else>Not in stock</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/store/authStore";
import { ElNotification } from "element-plus";
import "element-plus/dist/index.css";
import axios from "axios";

const authStore = useAuthStore();
const props = defineProps({
  product: {
    _id: String,
    name: String,
    price: String,
    oldPrice: String,
    images: Array,
  },
});

const isDisplayingTable = ref(false);
let gridData = ref([]);
let quantity = ref(1);

const drawerShowCurrentItem = (string) => {
  const productObject = props.product;
  if (string == "images") {
    return productObject["images"][0];
  }
  return productObject[string];
};

const manageQuantity = (operation) => {
  if (quantity.value > 0 && quantity.value < 10) {
    if (!operation) return quantity.value--;
    return quantity.value++;
  }
  if (quantity.value == 0) {
    if (!operation) return;
    return quantity.value++;
  } else if (quantity.value == 10) {
    if (!operation) return quantity.value--;
    return;
  }
};

const addToCart = async () => {
  const productId = props.product._id;

  const data = {
    productId: productId,
    quantity: quantity.value,
  };

  const response = await axios.post(
    `/api/users/${authStore.user.id}/cart`,
    data
  );

  const cartItemsAmount = response.data.user.cartItems.length;

  if (response.data.success) {
    return (
      authStore.setCartItemsAmount(cartItemsAmount),
      (isDisplayingTable.value = false),
      ElNotification({
        title: "Success! ",
        message: response.data.success,
        type: "success",
        duration: 3000,
      })
    );
  } else {
    return ElNotification({
      title: "Error! ",
      message: response.data.error,
      type: "error",
      duration: 3000,
    });
  }
};

onMounted(async () => {
  const cartItemsResponse = await axios.get(
    `/api/users/${authStore.user.id}/cart`
  );

  gridData.value = cartItemsResponse.data;
});
</script>

<style scoped>
.drawer-adding-product {
  width: 100%;
  height: 200px;
  margin-bottom: 100px;
  display: flex;
  justify-content: center;
  flex-direction: row;
}

.drawer-adding-data {
  width: 20%;
  margin-left: 30px;
}

.drawer-adding-data-prices {
  display: flex;
  align-items: center;
  justify-content: center;
}

.drawer-adding-data-quantity {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-plus-minus {
  width: auto;
  border-radius: 20px;
}

.form-control {
  border: none;
  text-align: center;
  pointer-events: none;
  margin: 0;
  padding: 0;
  height: 100%;
}

.input-group-text {
  border: none;
  cursor: pointer;
  background-color: #fff;
}

.prevent-select {
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
}

.drawer-adding-data-name {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 500;
}

.drawer-adding-product img {
  object-fit: fill;
}

.drawer-new-price {
  color: #686868;
  font-size: 20px;
  font-weight: 500;
  margin: 0 12px 0 0;
}

.drawer-old-price {
  color: #7e4c4f;
  font-size: 20px;
  font-weight: 500;
  text-decoration: line-through;
}

/* drawer layout */
.el-row {
  display: flex;
  justify-content: space-around;
  margin-bottom: 100px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.el-button-bg {
  color: white;
  background: #7e4c4f;
}
</style>
