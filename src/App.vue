<template>
  <router-view />
</template>

<script>
export default {
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
};
</script>

<style></style>
