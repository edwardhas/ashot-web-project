<template>
  <div class="contact-area pt-100 pb-100">
    <div class="container">
      <h4
        class="contact-title"
        style="display: flex; justify-content: center; margin-bottom: 40px"
      >
        GENERATE A PROMOCODE
      </h4>
      <div class="center date-picker-input">
        <el-date-picker
          v-model="discountExpirationDateInput"
          type="datetime"
          placeholder="Select Expiration Date"
          :shortcuts="shortcuts"
        />
      </div>
      <div class="center">
        <el-input
          class="discount-generator-input"
          v-model="uppercaseDiscountCode"
          placeholder="Please input"
          @input="removeSpaces"
        />
        <el-input
          class="discount-percentage-input"
          v-model="discountPercentage"
          type="number"
          min="0"
          @input="removeSpaces"
        />
        <el-button
          class="discount-generator-button"
          color="#7e4c4f"
          @click="handleGenerateDiscount"
          >GENERATE!</el-button
        >
      </div>
    </div>

    <div class="container center" style="display: flex; flex-direction: column">
      <h4
        class="contact-title"
        style="display: flex; justify-content: center; margin-top: 80px"
      >
        All Promocodes
      </h4>
      <el-table :data="discountsTableData" style="width: 100%">
        <el-table-column prop="_id" label="Discount ID" width="170" />
        <el-table-column label="Created By" width="170">
          <template #default="{ row }">
            {{ row.user.username }} {{ row.user.userlastname }}
          </template>
        </el-table-column>
        <el-table-column prop="discountCode" label="Code" width="120" />
        <el-table-column prop="percentage" label="Value of Code" width="100">
          <template #default="{ row }"> {{ row.percentage }}% off </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="Created At" width="200" />
        <el-table-column prop="expires" label="Expires At" width="200" />
        <el-table-column prop="expires" label="Is Active" width="100">
          <template #default="{ row }">
            <el-tag
              :type="getCurrentDate === row.expires ? 'danger' : 'success'"
              effect="dark"
            >
              {{ getCurrentDate === row.expires ? "Expired" : "Active" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="Operations" min-width="120">
          <template #default="{ row: discount }">
            <el-button color="#7e4c4f" size="medium"> Edit </el-button>
            <el-button
              type="danger"
              size="medium"
              @click="deleteDiscount(discount._id)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import { ElNotification } from "element-plus";

const authStore = useAuthStore();

const discountCodeInput = ref("");
const discountExpirationDateInput = ref("");
const discountPercentage = ref("");

const removeSpaces = () => {
  discountCodeInput.value = discountCodeInput.value.replace(/\s+/g, "");
};

const uppercaseDiscountCode = computed({
  get() {
    return discountCodeInput.value.toUpperCase();
  },
  set(value) {
    discountCodeInput.value = value.toUpperCase(); // Convert input to uppercase
  },
});

const shortcuts = [
  {
    text: "Today",
    value: new Date(),
  },
  {
    text: "1 week later",
    value: () => {
      const date = new Date();
      date.setDate(date.getDate() + 7);
      return date;
    },
  },
  {
    text: "2 weeks later",
    value: () => {
      const date = new Date();
      date.setDate(date.getDate() + 14);
      return date;
    },
  },
  {
    text: "Month Later",
    value: () => {
      const date = new Date();
      date.setDate(date.getDate() + 30);
      return date;
    },
  },
];

const discountsTableData = ref([]);

// watch(discountsTableData, (newValue, oldValue) => {
//   console.log(newValue);
//   console.log(oldValue);
//   discountsTableData.value = newValue;
//   console.log(discountsTableData.value);

//   ElNotification({
//     title: "Success",
//     message: `Item was successfuly added`,
//     type: "success",
//     duration: 3000,
//   });
// });

const deleteDiscount = async (discountId) => {
  console.log(discountId);
  const response = await axios.delete(`/api/delete-discount/${discountId}`);
  discountsTableData.value = response.data.discounts;
};

const handleGenerateDiscount = async () => {
  const data = {
    discountCode: discountCodeInput.value,
    expirationDate: discountExpirationDateInput.value,
    discountPercentage: discountPercentage.value,
  };

  try {
    const response = await axios.post(
      `/api/generate-discount/${authStore.user.id}`,
      data
    );

    response.data.success
      ? ElNotification({
          title: "Success",
          message: `${response.data.success}`,
          type: "success",
          duration: 3000,
        })
      : ElNotification({
          title: "Error",
          message: `${response.data.error}`,
          type: "danger",
          duration: 3000,
        });

    discountCodeInput.value = "";
    discountExpirationDateInput.value = "";
    discountPercentage.value = "";
  } catch (error) {
    throw error;
  }
};

const getCurrentDate = () => {
  const now = new Date(Date.now());
  // from iso to regular format
  const formattedDate = now.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "UTC",
  });
  console.log(formattedDate);
  return formattedDate;
};

onMounted(async () => {
  try {
    const response = await axios.get("/api/get-discounts");
    discountsTableData.value = response.data.discounts;
  } catch (error) {
    throw error;
  }
});
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
}

.date-picker-input {
  margin-bottom: 25px;
  height: 50px;
}

.discount-generator-input {
  width: 20%;
  height: 50px;
  border-radius: 0px;
  font-size: 20px;
}

.discount-percentage-input {
  width: 20%;
  height: 50px;
  border-radius: 0px;
  font-size: 30px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* will allow to style elements inside the shadow DOM */
::v-deep(.el-input__inner) {
  font-weight: bolder;
  text-align: center;
}

.discount-generator-button {
  width: 10%;
  height: 50px;
  border-radius: 3px;
}

@media screen and (max-width: 700px) {
  .discount-generator-input {
    width: 50%;
  }
  .discount-generator-button {
    width: 25%;
  }
}
</style>
