<template>
  <div>
    <div class="container text-center pt-4">
      <h5 class="card-title">History</h5>
    </div>
    <div class="d-flex justify-content-center mt-4 mb-4 mx-4 gap-2">
      <div class="btn-group d-flex">
        <button
          @click="showFuture"
          type="button"
          :class="defaultHistory ? 'btn btn-outline-primary w-100 active' : 'btn btn-outline-primary w-100'"
        >
          Upcoming appointments
        </button>
        <button
          @click="showPast"
          type="button"
          :class="!defaultHistory ? 'btn btn-outline-primary w-100 active' : 'btn btn-outline-primary w-100'"
        >
          Past appointments
        </button>
      </div>
    </div>
    <div v-if="listHistory.length > 0" class="d-flex flex-column align-items-center justify-content-center">
      <div class="w-75" v-for="(history, index) in listHistory" :key="index">
        <HistoryCard :history="history" />
      </div>
    </div>
    <div v-else>
      <div v-if="defaultHistory">
        <NoAppointment />
      </div>
      <div v-else>
        <NoPastAppointment />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import HistoryCard from "./HistoryCard.vue";
import NoAppointment from "./NoAppointment.vue";
import NoPastAppointment from "./NoPastAppointment.vue";
import { useReservationsStore } from "../../stores/reservations";

const { getReservations } = useReservationsStore();
const { reservations } = storeToRefs(useReservationsStore());
getReservations();

const date = new Date();
const defaultHistory = ref(true);

const listHistory = computed(() =>
  reservations.value.filter((value) =>
    defaultHistory.value === true
      ? new Date(value.timeSlot).getTime() > date.getTime()
      : new Date(value.timeSlot).getTime() < date.getTime()
  )
);

const showFuture = () => {
  defaultHistory.value = true;
};

const showPast = () => {
  defaultHistory.value = false;
};
</script>
