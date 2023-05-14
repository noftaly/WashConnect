import { defineStore } from "pinia";
import axios from "../utils/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  actions: {
    async fetchUser() {
      const response = await axios.get("/auth/me");
      this.user = response.data;
      this.isAuthenticated = true;
      return response.data;
    },

    async login(user) {
      const response = await axios.post("/auth/login", {
        username: user.username,
        password: user.password,
      });
      this.isAuthenticated = true;
      this.user = response.data;
    },

    async logout() {
      await axios.post("/auth/logout");
      this.user = null;
      this.isAuthenticated = false;
    },

    async register(user) {
      await axios.post("/auth/register", {
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
        phoneNumber: user.phoneNumber,
      });
    },
    async topUpBalance(amount) {
      const response = await axios.post("/auth/topup", {
        amount: amount,
      });
      this.user = response.data;
    }
  },
});
