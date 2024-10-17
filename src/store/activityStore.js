import { defineStore } from "pinia";
import axios from "axios";

export const useActivityStore = defineStore("activity", {
  state: () => ({
    trackedUsers: {}, // A map to hold userId-specific tracking data
  }),
  actions: {
    async trackUserActivity(userId) {
      if (!this.trackedUsers[userId]) {
        try {
          // make API request to track user activity
          await axios.post("/api/track-activity", { userId });

          // Mark the user as already counted for today
          this.trackedUsers[userId] = true;
        } catch (error) {
          console.error("Error tracking user activity:", error);
        }
      }
    },
    async fetchDailyStats() {
      const response = await axios.get("/api/daily-statistics");
      return response.data.dailyActiveUsers;
    },
    async fetchMonthlyStats() {
      const response = await axios.get("/api/monthly-statistics");
      return response.data.monthlyActiveUsers;
    },
    resetTracking() {
      // Clear all tracking data (e.g., when user logs out or switches)
      this.trackedUsers = {};
    },
  },
});
