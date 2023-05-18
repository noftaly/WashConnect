<template>
  <main class="container-lg">
    <div class="mx-4 me-md-5">
      <div v-for="machine in searchedMachines" :key="machine.id">
        <RouterLink :to="`/machines/${machine.id}`" class="text-decoration-none">
          <MachineCard v-bind="machine" />
        </RouterLink>
      </div>
      <div v-if="searchedMachines.length === 0">
        <h5 class="text-center mt-6 my-auto">No machines matching your search query was found</h5>
      </div>
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import MachineCard from "../components/machine/MachineCard.vue";
import { useMachinesStore } from "../stores/machines";

const { searchedMachines } = storeToRefs(useMachinesStore());
</script>

<style scoped>
a {
  color: inherit;
}
</style>