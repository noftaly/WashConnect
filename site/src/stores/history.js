import { defineStore } from "pinia";
import axios from "../utils/axios";

export const useHistoryStore = defineStore("history", {
  state: () => ({
    machineHistory: []
  }),
  actions: {
    async getMachineHistory() {
      const response = await axios.get('/timeslots');
      this.machineHistory = response.data;
	  return true;
    },
  },
});
