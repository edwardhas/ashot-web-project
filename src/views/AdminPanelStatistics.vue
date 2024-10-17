<template>
  <div class="title">
    <h1>Statistics</h1>
  </div>

  <div class="container">
    <el-row class="container-row" :gutter="16">
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="dailyActiveUsers">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                Daily active users
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>than yesterday</span>
              <span class="green"> 24% </span>
            </div>
          </div>
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
          <div class="statistic-footer">
            <div class="footer-item">
              <span>month on month</span>
              <span class="red"> 12% </span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="72000" title="New transactions today">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                New transactions today
              </div>
            </template>
          </el-statistic>
          <div class="statistic-footer">
            <div class="footer-item">
              <span>than yesterday</span>
              <span class="green"> 16% </span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useActivityStore } from "../store/activityStore";

// Declare reactive variables
const dailyActiveUsers = ref(0);
const monthlyActiveUsers = ref(0);

// Pinia store instances
const activityStore = useActivityStore();

onMounted(async () => {
  // Fetch daily and monthly statistics
  dailyActiveUsers.value = await activityStore.fetchDailyStats();
  monthlyActiveUsers.value = await activityStore.fetchMonthlyStats();
});
</script>

<style scoped>
:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}

.title {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 60px;
}

.el-statistic {
  --el-statistic-content-font-size: 28px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
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
