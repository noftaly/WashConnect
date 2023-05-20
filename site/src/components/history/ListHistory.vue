<template>
  <div>
    <div class="container text-center pt-4">
      <h5 class="card-title">History</h5>
    </div>
    <div class="d-flex justify-content-center mt-4 mb-4 mx-4 gap-2">
      <div class="btn-group d-flex gap-4">
        <button
          @click="showRdvBecome"
          type="button"
          :class="defaultHistory ? 'btn btn-outline-primary w-100 active' : 'btn btn-outline-primary w-100'"
        >
          Upcoming appointments
        </button>
        <button
          @click="showRdvPassed"
          type="button"
          :class="!defaultHistory ? 'btn btn-outline-primary w-100 active' : 'btn btn-outline-primary w-100'"
        >
          Past appointments
        </button>
      </div>
    </div>
    <div
      class="d-flex flex-column align-items-center justify-content-center"
      v-if="listHistory.length > 0 && isPageLoaded === true"
    >
      <div class="w-75" v-for="(history, index) in listHistory" :key="index">
        <HistoryCard :history="history" />
      </div>
    </div>
    <div v-else-if="listHistory.length === 0 && isPageLoaded === true">
      <div v-if="defaultHistory">
        <NoAppointment />
      </div>
      <div v-else-if="!defaultHistory">
        <NoPastAppointment />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHistoryStore } from "../../stores/history";
import { computed, onBeforeMount, ref } from "vue";
import HistoryCard from "./HistoryCard.vue";
import NoAppointment from "./NoAppointment.vue";
import NoPastAppointment from "./NoPastAppointment.vue";

const historyStore = useHistoryStore();

const date = new Date();
const defaultHistory = ref(true);
const isPageLoaded = ref(false);

const listHistory = computed(() =>
  historyStore.machineHistory.filter((value) =>
    defaultHistory.value === true
      ? new Date(value.timeSlot).getTime() > date.getTime()
      : new Date(value.timeSlot).getTime() < date.getTime()
  )
);

const showRdvBecome = () => {
  defaultHistory.value = true;
};

onBeforeMount(async () => {
  const isFetchedDone = await historyStore.getMachineHistory();
  if (isFetchedDone) {
    isPageLoaded.value = true;
  }
});

const showRdvPassed = () => {
  defaultHistory.value = false;
};
</script>
