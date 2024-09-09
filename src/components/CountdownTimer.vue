<template>
  <div class="countdown">
    <p v-if="timeRemaining >= 0">Time Remaining: {{ formattedTime }}</p>
    <p v-else>The deal has ended!</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      endTimestamp: null,
      timer: null,
      timeRemaining: 0,
    };
  },
  computed: {
    formattedTime() {
      if (this.timeRemaining < 0) return "00:00:00";
      const hours = Math.floor(this.timeRemaining / (1000 * 60 * 60));
      const minutes = Math.floor(
        (this.timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((this.timeRemaining % (1000 * 60)) / 1000);
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`;
    },
  },
  methods: {
    async fetchDeal() {
      try {
        const response = await axios.get("/api/deal");
        // this.name = response.data.name;
        console.log(response.data);
        this.endTimestamp = new Date(response.data.endTimestamp);
        this.calculateTimeRemaining();
        this.startTimer();
      } catch (error) {
        console.error("Error fetching deal:", error);
      }
    },
    calculateTimeRemaining() {
      const now = new Date();
      this.timeRemaining = this.endTimestamp - now;
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.calculateTimeRemaining();
        if (this.timeRemaining <= 0) {
          clearInterval(this.timer);
        }
      }, 1000);
    },
  },
  mounted() {
    this.fetchDeal();
  },
};
</script>

<style scoped>
.countdown {
  text-align: center;
  font-family: Arial, sans-serif;
}
</style>
