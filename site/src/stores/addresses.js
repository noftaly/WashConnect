import { defineStore } from "pinia";
import axios from "../utils/axios";

export const useAddressesStore = defineStore("addresses", {
  state: () => ({
    addresses: [],
    address: null,
  }),
  actions: {
    async getPersonalAddresses() {
      const response = await axios.get("/addresses");
      this.addresses = response.data;
      return response.data;
    },

    async createPersonalAddress(address) {
      const response = await axios.post("/addresses", {
        streetL1: address.streetL1,
        city: address.city,
        zip: address.zip,
        country: address.country,
      });
      this.address = response.data;
      return response.data;
    },

    async getPersonalAddressById(addressId) {
      const response = await axios.get(`/addresses/${addressId}`);
      this.address = response.data;
      return response.data;
    },

    async removePersonalAddress(addressId) {
      await axios.delete(`/addresses/${addressId}`);
    },
  },
});
