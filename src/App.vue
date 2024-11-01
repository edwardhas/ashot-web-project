<template>
  <router-view />
</template>

<script setup>
import { io } from "socket.io-client";
import { onMounted, onUnmounted } from "vue";
import { useOnlineUsersCountStore } from "./store/onlineUsersCount";

const onlineUserCountStore = useOnlineUsersCountStore();
let socket;

onMounted(async () => {
  const token = localStorage.getItem("token"); // Fetch the JWT token
  socket = io("https://localhost:8000", {
    auth: { token },
    reconnection: true, // Enable reconnection
    reconnectionAttempts: 5, // Attempt to reconnect 5 times
    reconnectionDelay: 2000, // Delay between reconnections (in ms)
  });

  socket.on("connect", () => {
    console.log("Connected to server!");
  });

  socket.on("activeUsers", (activeUsers) => {
    onlineUserCountStore.setActiveUsers(activeUsers); // Update active users in Pinia store
    onlineUserCountStore.setUserCount(activeUsers.length); // Update user count
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error);
  });
});

onUnmounted(() => {
  socket.off("activeUsers");
  socket.close();
});
// methods: {
//   setupWebSocket() {
//     const socket = new WebSocket("wss://localhost:8000/ws");
//     socket.onopen = () => {
//       console.log("WebSocket connection established");
//     };
//     socket.onmessage = (event) => {
//       console.log(`Message from server: ${event.data}`);
//       this.messages.push(event.data);
//     };
//     socket.onerror = (error) => {
//       console.error(`WebSocket error: ${error}`);
//     };
//     socket.onclose = () => {
//       console.log("WebSocket connection closed");
//     };
//   },
// },
</script>

<style></style>
