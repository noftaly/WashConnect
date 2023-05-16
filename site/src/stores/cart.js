import { defineStore } from "pinia";
import axios from "../utils/axios";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cartItems: [],
  }),
  getters: {
    total: (state) => {
      return state.cartItems.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
    },
    count: (state) => {
      return state.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    uniqueCount: (state) => {
      return state.cartItems.length;
    },
  },
  actions: {
    quantityOf(productId) {
      return this.cartItems.find((item) => item.productId === productId)?.quantity ?? 0;
    },

    async fetchItems() {
      const response = await axios.get("/order-lines");
      this.cartItems = response.data;
    },

    async addToCart(orderLine) {
      const response = await axios.post("/order-lines", {
        quantity: orderLine.quantity,
        productId: orderLine.productId,
      });
      this.cartItems.push(response.data);

      return response.data;
    },

    async updateItem(orderLine) {
      const orderLineId = this.cartItems.find((item) => item.productId === orderLine.productId)?.id;
      if (!orderLineId) throw new Error(`Order line with product id ${orderLine.productId} not found in cart`);

      const response = await axios.patch(`/order-lines/${orderLineId}`, {
        quantity: orderLine.quantity,
        productId: orderLine.productId,
      });
      const index = this.cartItems.findIndex((p) => p.id === orderLineId);
      this.cartItems[index] = response.data;

      return response.data;
    },

    async addOne(productId) {
      const orderLine = this.cartItems.some((item) => item.productId === productId);
      if (orderLine) return await this.updateItem({ productId, quantity: 1 });

      return await this.addToCart({ productId, quantity: 1 });
    },

    async removeOne(productId) {
      const orderLine = this.cartItems.find((item) => item.productId === productId);
      if (orderLine) {
        if (orderLine.quantity > 1) return await this.updateItem({ productId, quantity: -1 });
        return await this.deleteItem(orderLine.id);
      }
    },

    async deleteItem(id) {
      await axios.delete(`/order-lines/${id}`);
      const index = this.cartItems.findIndex((p) => p.id === id);
      this.cartItems.splice(index, 1);
    },
  },
});
