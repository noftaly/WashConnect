import { defineStore } from "pinia";
import axios from "../utils/axios";

export const useTimeSlotsStore = defineStore("timeSlots", {
    state: () => ({
      timeSlots: [],
      timeSlot: null,
    }),

    actions: {
        async getCurrentReservations() {
            const response = await axios.get("/timeslots");
            this.timeSlots = response.data;
            return response.data;
        },

        async makeReservation(timeSlot) {
            const response = await axios.post("/timeslots/performreservation", timeSlot);
            this.timeSlot = response.data;
        },

        async getScheduleForMachine() {
            const response = await axios.get("/timeslots/:machineId");
            this.timeSlots = response.data;
            return response.data;
        }
    },
});
    