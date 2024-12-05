<template>
  <div class="container">
    <el-row class="container-row" :gutter="16">
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="userStore.onlineCount">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                Online Now
              </div>
            </template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="dailyActiveUsers">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                Daily active users
              </div>
            </template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="monthlyActiveUsers">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                Monthly Active Users
              </div>
            </template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic
            :value="todayTransactions"
            title="New transactions today"
          >
            <template #title>
              <div style="display: inline-flex; align-items: center">
                New transactions today
              </div>
            </template>
          </el-statistic>
        </div>
      </el-col>
    </el-row>
    <div class="container">
      <el-collapse>
        <el-collapse-item>
          <template #title>
            <div class="collapse-custom-title">
              Users Information &#x1F9D1;&#x200D;&#x1F4BB;
              &#x1F64B;&#x200D;&#x2642;&#xFE0F;
            </div>
          </template>
          <div class="center">
            <el-input
              v-model="searchInput"
              style="width: 240px"
              size="large"
              placeholder="Please Input"
              :suffix-icon="Search"
            />
          </div>

          <el-table :data="filteredUsers" style="width: 100%">
            <el-table-column prop="created" label="Created At" width="110" />
            <el-table-column prop="_id" label="Id" width="150" />
            <el-table-column prop="email" label="email" width="150" />
            <el-table-column label="Delivery Info">
              <el-table-column prop="username" label="User" width="100" />
              <el-table-column label="Address Info">
                <el-table-column
                  prop="shippingAddress.state"
                  label="State"
                  width="70"
                />
                <el-table-column
                  prop="shippingAddress.city"
                  label="City"
                  width="120"
                />
                <el-table-column
                  prop="shippingAddress.street"
                  label="Address"
                  width="150"
                />
                <el-table-column
                  prop="shippingAddress.zip"
                  label="Zip"
                  width="70"
                />
              </el-table-column>
              <el-table-column prop="isOnline" label="Status" width="100">
                <template #default="{ row }">
                  <el-tag
                    :type="row.isOnline === 'Online' ? 'success' : 'danger'"
                    effect="dark"
                  >
                    {{ row.isOnline === "Online" ? "Online" : "Offline" }}
                  </el-tag>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="Products In The Cart">
              <template #default="{ row }">
                <el-table :data="row.cartItems" style="width: 100%">
                  <el-table-column prop="image" label="Image" width="120">
                    <!-- Display image if available -->
                    <template #default="{ row: product }">
                      <img
                        :src="product.images[0]"
                        alt="Product Image"
                        width="120"
                        height="150"
                      />
                    </template>
                  </el-table-column>

                  <el-table-column prop="name" label="Name" width="120" />

                  <el-table-column prop="quantity" label="QTY" width="80" />
                </el-table>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div class="container">
      <el-collapse>
        <el-collapse-item>
          <template #title>
            <div class="collapse-custom-title">
              Products are viewed NOW 🛒 &#x1F4C8;
            </div>
          </template>
          <el-table :data="watchedProducts" style="width: 100%">
            <el-table-column prop="_id" label="Id" width="150" />
            <el-table-column prop="images" label="Image" width="170">
              <template #default="{ row: product }">
                <img
                  :src="product.images[0]"
                  alt="Product Image"
                  width="120"
                  height="150"
                />
              </template>
            </el-table-column>
            <el-table-column prop="name" label="name" width="200" />
            <el-table-column prop="price" label="Price" width="90" />
            <el-table-column prop="oldPrice" label="Old Price" width="90" />
            <el-table-column prop="isInStock" label="Availability" width="170">
              <template #default="{ row: product }">
                <el-tag
                  :type="product.isInStock ? 'success' : 'danger'"
                  effect="dark"
                >
                  {{ product.isInStock ? "INSTOCK" : "OUT OF STOCK" }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="quantity" label="Quantity" />
            <el-table-column prop="views" label="Views" width="100" />
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </div>

    <!-- <div class="container">
      <el-collapse>
        <el-collapse-item title="Consistency">
          <el-dropdown>
            <el-button type="primary">
              Dropdown List<el-icon class="el-icon--right"
                ><arrow-down
              /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu
                v-for="(value, month) in monthsData"
                :key="month"
              >
                <el-dropdown-item @click="handleMonthClick(value)">{{
                  month
                }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <Chart type="bar" :data="chartData" class="w-100" />
        </el-collapse-item>
      </el-collapse>
    </div> -->
    <div class="container" style="margin-bottom: 100px">
      <el-collapse>
        <el-collapse-item>
          <template #title>
            <div class="collapse-custom-title">
              Chart of Earnings &#128181; 💲
            </div>
          </template>
          <!-- <el-dropdown>
            <el-button type="primary">
              Dropdown List
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(value, month) in monthsData"
                  :key="month"
                  @click="handleMonthClick(value)"
                >
                  {{ month }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
            
          </el-dropdown> -->
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            unlink-panels
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            :shortcuts="shortcuts"
            size="large"
            @change="fetchTransactions"
            style="margin-top: 20px"
          />
          <Chart type="bar" :data="chartData" class="w-100" />
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup>
// import { io } from "socket.io-client";
import { ref, onMounted, computed } from "vue";
import { useActivityStore } from "../store/activityStore";
import { useUserStore } from "@/store/onlineUsersCount";
import { io } from "socket.io-client";
const socket = io("https://localhost:8000");
import axios from "axios";

import { ElNotification } from "element-plus";
import "element-plus/dist/index.css";

import "primeicons/primeicons.css";

import Chart from "primevue/chart";

// Declare reactive variables
const dailyActiveUsers = ref(0);
const monthlyActiveUsers = ref(0);
const chartData = ref();
const searchInput = ref("");
const dateRange = ref([]);

const shortcuts = [
  {
    text: "Last week",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "Last month",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "Last 3 months",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];

// Pinia store instances
const activityStore = useActivityStore();
const userStore = useUserStore();

// datas & tables
const usersTable = ref([]);
const watchedProducts = ref([]);

const todayTransactions = ref();

const fetchTransactions = async () => {
  if (!dateRange.value || dateRange.value.length < 2) return;
  const [startDate, endDate] = dateRange.value;

  // Convert dates to UNIX timestamps
  const startOfDay = Math.floor(
    new Date(startDate).setHours(0, 0, 0, 0) / 1000
  );
  const endOfDay = Math.floor(
    new Date(endDate).setHours(23, 59, 59, 999) / 1000
  );

  try {
    const response = await axios.post("/api/transactions/picked-dates", {
      created: {
        gte: startOfDay,
        lte: endOfDay,
      },
    });

    if (!response.data.success) return;

    const transactions = response.data.charges;

    // Deduplicate transactions based on created and amount
    const uniqueTransactions = Array.from(
      new Map(
        transactions.map((tx) => [`${tx.created}-${tx.amount}`, tx])
      ).values()
    );

    // Aggregate transactions by weekday
    const transactionMap = new Map();
    uniqueTransactions.forEach((element) => {
      const day = new Date(element.created * 1000).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      if (transactionMap.has(day)) {
        transactionMap.set(day, transactionMap.get(day) + element.amount / 100);
      } else {
        transactionMap.set(day, element.amount / 100);
      }
    });

    // Prepare data for the chart
    const titleArray = Array.from(transactionMap.keys());
    const transactionData = Array.from(transactionMap.values());

    chartData.value = setChartData(titleArray, transactionData);
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};

const setChartData = (titleArray, transactionData) => {
  return {
    labels: titleArray,
    datasets: [
      {
        label: "Earned",
        data: transactionData,
        backgroundColor: [
          "rgba(249, 115, 22, 0.2)",
          "rgba(6, 182, 212, 0.2)",
          "rgb(107, 114, 128, 0.2)",
          "rgba(139, 92, 246 0.2)",
        ],
        borderColor: [
          "rgb(249, 115, 22)",
          "rgb(6, 182, 212)",
          "rgb(107, 114, 128)",
          "rgb(139, 92, 246)",
        ],
        borderWidth: 1,
      },
    ],
  };
};

const filteredUsers = computed(() => {
  if (!searchInput.value) return usersTable.value;

  const search = searchInput.value.toLowerCase();
  return usersTable.value.filter((user) => {
    // Customize the fields you want to filter by
    return (
      user.created.toLowerCase().includes(search) ||
      user.username.toLowerCase().includes(search) ||
      user.shippingAddress.state.toLowerCase().includes(search) ||
      user.shippingAddress.city.toLowerCase().includes(search) ||
      user.shippingAddress.street.toLowerCase().includes(search) ||
      user.shippingAddress.zip.toString().toLowerCase().includes(search) ||
      user.isOnline.toLowerCase().includes(search)
    );
  });
});

onMounted(async () => {
  // watch for current products being viewed
  socket.on("productViewed", (data) => {
    watchedProducts.value = data.productList;
  });
  // Fetch daily and monthly statistics
  dailyActiveUsers.value = await activityStore.fetchDailyStats();
  monthlyActiveUsers.value = await activityStore.fetchMonthlyStats();

  userStore.fetchOnlineUsers();

  const date = new Date();
  const startOfDay = Math.floor(
    new Date(date.toString()).setHours(0, 0, 0, 0) / 1000
  );
  const endOfDay = Math.floor(
    new Date(date.toString()).setHours(23, 59, 59, 999) / 1000
  );

  try {
    const response = await axios.post("/api/transactions/picked-dates", {
      created: {
        gte: startOfDay,
        lte: endOfDay,
      },
    });

    if (!response.data.success) return;

    const transactions = response.data.charges;

    // Deduplicate transactions based on created and amount
    const uniqueTransactions = Array.from(
      new Map(
        transactions.map((tx) => [`${tx.created}-${tx.amount}`, tx])
      ).values()
    );
    todayTransactions.value = uniqueTransactions.length;
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }

  try {
    const response = await axios.get("/api/users-data-table");
    usersTable.value = response.data.users;
  } catch (error) {
    ElNotification({
      title: "Error!",
      message: error.message,
      type: "error",
    });
  }
});

// onUnmounted(() => {
//   socket.off("activeUsers");
//   socket.close();
// });
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Edu+AU+VIC+WA+NT+Pre&family=Gemunu+Libre:wght@200..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Protest+Strike&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Sixtyfour+Convergence&display=swap");
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.container {
  margin-top: 100px;
}

.section-title {
  font-family: "Edu AU VIC WA NT Pre", cursive;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.collapse-custom-title {
  font-size: 1.5rem;
  font-weight: bold; /* Make text bold */
  display: flex;
  align-items: center;
  gap: 8px; /* Add space between text and emoji */
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.center {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  /* background-color: #7e4c4f; */
  /* background-color: var(--el-bg-color-overlay); */
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
  display: flex;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>
