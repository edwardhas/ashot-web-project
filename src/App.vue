<template>
  <router-view />
</template>

<script>
import { io } from "socket.io-client";
export default {
  data() {
    return {
      activeUsers: 0,
    };
  },
  methods: {
    setupWebSocket() {
      const socket = new WebSocket("wss://localhost:8000/ws");

      socket.onopen = () => {
        console.log("WebSocket connection established");
      };

      socket.onmessage = (event) => {
        console.log(`Message from server: ${event.data}`);
        this.messages.push(event.data);
      };

      socket.onerror = (error) => {
        console.error(`WebSocket error: ${error}`);
      };

      socket.onclose = () => {
        console.log("WebSocket connection closed");
      };
    },
  },
  created() {
    // this.socket = io("https://localhost:8000");

    // this.socket.on("activeUsers", (count) => {
    //   this.activeUsers = count;
    // });
    const socket = io("https://localhost:8000");

    socket.on("activeUsers", (count) => {
      this.activeUsers = count;
    });
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
};
</script>

<style></style>
