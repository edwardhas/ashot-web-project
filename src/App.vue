<template>
  <router-view />
</template>

<script setup>
import { useUserStore } from "./store/onlineUsersCount";
import { useAuthStore } from "./store/authStore";
import { onMounted, watch } from "vue";

const authStore = useAuthStore();
const userStore = useUserStore();
watch(
  () => authStore.token, // Watching the token in the auth store
  (token) => {
    if (token) {
      userStore.initializeSocket(token);
    }
  },
  { immediate: true }
);
</script>

<style></style>
