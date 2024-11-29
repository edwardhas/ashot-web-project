import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
    cartItemsAmount: localStorage.getItem("amount") || 0,
  }),
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    setUser(user) {
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    setCartItemsAmount(cartItemsAmount) {
      this.cartItemsAmount = cartItemsAmount;
      localStorage.setItem("amount", cartItemsAmount);
    },
    clearToken() {
      this.token = null;
      localStorage.removeItem("token");
    },
    clearUser() {
      this.user = null;
      localStorage.removeItem("user");
    },
    clearCartItemsAmount() {
      this.cartItemsAmount = null;
      localStorage.removeItem("amount");
    },
    logout() {
      this.token = null;
      this.user = null;
      this.cartItemsAmount = null;
      localStorage.removeItem("amount");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getToken: (state) => {
      return state.token;
    },
    getUser: (state) => {
      return state.user;
    },
    getCartItemsAmount: (state) => {
      return state.cartItemsAmount;
    },
  },
});
