import { defineStore } from "pinia";
import axios from "../utils/axios";

export const useUsersStore = defineStore("users", {
    state: () => ({
      users: [],
      user: null,
    }),

    actions: {
        async getUsers() {
            const response = await axios.get("/users");
            this.users = response.data;
            return response.data;
        },

        async getUser(userId) {
            const response = await axios.get(`/users/${userId}`);
            this.user = response.data;
            return response.data;
        },
    },
});
    