import { defineStore } from "pinia";
import axios from "../utils/axios";

export const useReservationsStore = defineStore("reservations", {
    state: () => ({
      reservations: [],
      reservation: null,
    }),

    actions: {
        async getReservations() {
            // Returns user's reservations
            const response = await axios.get("/reservations");
            this.reservations = response.data;
            return response.data;
        },

        async createReservation(typeOfProduct, timeSlotId) {
            // Creates a reservation for a given time slot
            const response = await axios.post(`/reservations/${timeSlotId}`, {
                typeOfProduct: typeOfProduct
              });
            this.reservation = response.data;
        },

        async removeReservation(timeSlotId) {
            // Deletes a reservation
            await axios.delete(`/reservations/${timeSlotId}`);
        }
    },
});
    