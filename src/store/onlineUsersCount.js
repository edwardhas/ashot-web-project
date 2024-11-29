// import { defineStore } from "pinia";
// import { ref } from "vue";

// export const useOnlineUsersCountStore = defineStore("user", () => {
//   const onlineUserCount = ref(0);
//   const activeUsers = ref([]); // Array to hold active users

//   function setUserCount(count) {
//     onlineUserCount.value = count;
//   }

//   function setActiveUsers(users) {
//     activeUsers.value = users; // Update the active users
//   }

//   return { onlineUserCount, activeUsers, setUserCount, setActiveUsers };
// });

import { defineStore } from "pinia";
import { io } from "socket.io-client";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    onlineUsers: [],
    onlineCount: 0,
    socket: null,
  }),
  actions: {
    async initializeSocket() {
      const token = await localStorage.getItem("token"); // Retrieve JWT from local storage

      this.socket = io("https://localhost:8000", {
        auth: { token },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 2000,
      });

      this.socket.on("connect", () => {
        console.log("Socket connected:", this.socket.id);
        this.socket.emit("authenticate", { token }); // Emit token for authentication
      });

      this.socket.on("updateOnlineUsers", (users) => {
        this.onlineUsers = users;
        this.onlineCount = users.length;
      });
    },

    async fetchOnlineUsers() {
      try {
        const response = await axios.get("/api/users/online");
        this.onlineUsers = response.data.users;
        this.onlineCount = response.data.count;
      } catch (error) {
        console.error("Error fetching online users:", error);
      }
    },
  },
});
