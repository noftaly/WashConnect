<template>
  <main class="container-lg">
    <div class="mx-4 me-md-5">
      <div v-for="machine in searchedMachines" :key="machine.id">
        <RouterLink :to="`/machines/${machine.id}`" class="text-decoration-none">
          <MachineCard v-bind="machine" />
        </RouterLink>
      </div>
      <div class="inner cover d-flex flex-column align-items-center justify-content-center gap-4 pt-4 mx-5" v-if="searchedMachines.length === 0">
        <h5 class="lead text-center mt-6 mb-6 my-auto">No machines matching your search query was found. Click on the button below to access the available washing machines and to reserve one.</h5>
        <button @click="goToOffers" type="button" class="btn btn-outline-primary w-50">See Offers</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import MachineCard from "../components/machine/MachineCard.vue";
import { useMachinesStore } from "../stores/machines";

const { searchedMachines } = storeToRefs(useMachinesStore());

const router = useRouter();
const goToOffers = () => {
  router.push("/");
};
</script>

<style scoped>
a {
  color: inherit;
}
</style>
