<template>
  <main>
    <div class="row">
      <div class="col-md-3">
        <div class="mx-3 ms-md-3">
          <MachineFilters/>
        </div>
      </div>
      <div class="col-md-9">
        <div class="mx-4 me-md-5">
          <div v-for="item in shownItems" :key="item.id">
            <RouterLink :to="`/machines/${item.id}`" class="text-decoration-none">
              <MachineCard v-bind="item" />
            </RouterLink>
          </div>
          <div v-if="shownItems.length === 0">
            <h5 class="text-center mt-6 my-auto">No machines matching your filters was found</h5>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import axios from "../../utils/axios.js";
import { useMachinesStore } from "../../stores/machines.js";
import MachineFilters from "./MachineFilters.vue";
import MachineCard from "./MachineCard.vue";

const { machines } = storeToRefs(useMachinesStore());
const { fetchMachines, filters } = useMachinesStore();

fetchMachines();

const shownItems = ref(fetchMachines());

watch(machines, () => {
  shownItems.value = [...machines.value];
});


// async function filterMachines() {
//    await axios.get("http://localhost:5050/machines", {
//     params: {
//       pgt: filters.pgt,
//       plt: filters.plt
//     }
//   })
//   .then((response) => {
//     machines.value = response.data;
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// } 

// filterMachines();

</script>

<style scoped>
a {
  color: inherit;
}
</style>
