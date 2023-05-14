import { defineStore } from "pinia";
import axios from "../utils/axios";

export const useTimeSlotsStore = defineStore("timeSlots", {
    state: () => ({
      timeSlots: [],
      timeSlot: null,
    }),

    actions: {
        async getTimeSlots(machineId) {
            // Returns machine's time slots
            const response = await axios.get(`/timeslots/${machineId}`);
            this.timeSlots = response.data;
            return response.data;
        },

        async createTimeSlot(machineId, timeSlot, machineType) {
            // Creates a time slot for a given machine
            const response = await axios.post(`/timeslots/${machineId}`, {
                timeSlot: timeSlot,
                machineType: machineType
              });
            this.timeSlot = response.data;
        },

        async removeTimeSlot(timeSlotId) {
            // Deletes a time slot and its associated reservations
            await axios.delete(`/timeslots/${timeSlotId}`);
        }
    },
});
    