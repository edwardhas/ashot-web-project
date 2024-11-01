import { defineStore } from "pinia";
import { ref } from "vue";

export const useOnlineUsersCountStore = defineStore("user", () => {
  const onlineUserCount = ref(0);
  const activeUsers = ref([]); // Array to hold active users

  function setUserCount(count) {
    onlineUserCount.value = count;
  }

  function setActiveUsers(users) {
    activeUsers.value = users; // Update the active users
  }

  return { onlineUserCount, activeUsers, setUserCount, setActiveUsers };
});
