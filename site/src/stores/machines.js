import { defineStore } from "pinia";
import axios from "../utils/axios";

export const useMachinesStore = defineStore("machines", {
  state: () => ({
    machines: [],
    searchedMachines: [],
    machine: null,
    filters: {
      pgt: 1,
      plt: 20,
      type: 0,
      capacity: 10,
      before: new Date().toISOString(),
      after: new Date().toISOString(),
    },
  }),
  actions: {
    clearMachine() {
      this.machine = null;
    },

    getMachineById(id) {
      return this.machines.find((machine) => machine.id === id);
    },

    loadMachine(id) {
      this.machine = this.getmachineById(id);
    },

    async fetchMachines() {
      const response = await axios.get("/machines");
      this.machines = response.data;
    },

    async searchMachines(searchQuery) {
      const response = await axios.get(`/machines?q=${searchQuery}`);
      this.searchedMachines = response.data;
    },

    async fetchMachine(id) {
      const response = await axios.get(`/machines/${id}`);
      this.machine = response.data;
      return response.data;
    },

    async createMachine(machine) {
      const response = await axios.post("/machines", machine);
      this.machines.push(response.data);
      return response.data;
    },

    async updateMachine(machine) {
      const response = await axios.patch(`/machines/${machine.id}`, machine);
      const index = this.machines.findIndex((p) => p.id === machine.id);
      this.machines[index] = response.data;

      return response.data;
    },

    async deleteMachine(id) {
      await axios.delete(`/machines/${id}`);
      const index = this.machines.findIndex((p) => p.id === id);
      this.machines.splice(index, 1);
    },
  },
});
