import { defineStore } from "pinia";
import AuthService from "../services/AuthService.js";
import { useCartStore } from "./cart.js";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
  }),
  getters: {
    isAuthenticated: (state) => {
      return Boolean(state.user);
    },
    // isAdmin: (state) => {
    //   return state.user && state.user.role === "admin";
    // },
  },
  actions: {
    async login(credentials) {
      this.user = await AuthService.login(credentials);
      useCartStore().fetchItems();
    },

    async logout() {
      AuthService.logout();
      this.user = null;
    },

    async register(user, address) {
      await AuthService.register(user, address);
    },
  },
});
