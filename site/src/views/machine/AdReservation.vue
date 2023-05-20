<template>
  <main class="container my-5">
    <div class="d-flex justify-content-center">
      <img class="mt-5" style="width: 25%" src="../../assets/Logo_WashConnect.png" />
    </div>
    <h1 class="text-center mt-5">Confirm your reservation !</h1>

    <br />
    <MachineReservedCard :machineSelected="machine"></MachineReservedCard>
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";

import router from "../../router/index.js";
import { useAuth } from "../../utils/useAuthHook.js";
import MachineReservedCard from "../../components/machine/MachineReservedCard.vue";
import { useMachinesStore } from "../../stores/machines";

const { isAuthenticated } = storeToRefs(useAuth());
if (isAuthenticated.value === false) {
  router.push({ name: "login" });
}

const { machine } = storeToRefs(useMachinesStore());
const { fetchMachine } = useMachinesStore();
fetchMachine(Number(router.currentRoute.value.params.id));
</script>
