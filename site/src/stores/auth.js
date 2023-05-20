import { defineStore } from "pinia";
import axios from "../utils/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: null,
  }),
  actions: {
    async fetchUser() {
      try {
        const response = await axios.get("/auth/me");
        this.user = response.data;
        this.isAuthenticated = true;
        return response.data;
      } catch (error) {
        if (error.response && error.response.status === 401) {
          // Handle the case when no user is logged in
          this.user = {};
          this.isAuthenticated = false;
          return null; // Or any other value to indicate no user
        } else {
          // Handle other errors
          console.log("An error has occurred");
          console.error(error);
          throw error; // Re-throw the error to be handled by the caller
        }
      }
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
    },
  },
});
