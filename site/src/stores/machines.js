import { defineStore } from "pinia";
import axios from "../utils/axios";

export const useMachinesStore = defineStore("machines", {
  state: () => ({
    machines: [],
    searchedMachines: [],
    machine: null,
  }),
  getters: {
    getManufacturers: (state) => {
      return [...new Set(state.machines.map((machine) => machine.characteristic.manufacturer))];
    },
    getCategories: (state) => {
      return [...new Set(state.machines.map((machine) => machine.characteristic.category))];
    },
  },
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
      const response = await axios.get(`/machines/search?q=${searchQuery}`);
      this.searchedmachines = response.data;
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
