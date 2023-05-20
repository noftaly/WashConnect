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
import { ref } from "vue";
import axios from "../../utils/axios.js";

import router from "../../router/index.js";
import { useAuth } from "../../utils/useAuthHook.js";
import MachineReservedCard from "../../components/machine/MachineReservedCard.vue";

const { isAuthenticated } = storeToRefs(useAuth());
if (!isAuthenticated.value) {
  router.push({ name: "login" });
}

const id = parseInt(router.currentRoute.value.params.id);
const machine = ref({});

async function getMachineById() {
  try {
    const response = await axios.get(`/machines/${id}`);
    machine.value = response.data;
  } catch (error) {
    console.log("An error has occurred");
    console.error(error);
    machine.value = {};
  }
}

getMachineById();
</script>

<script>
export default {
  components: {
    MachineReservedCard,
  },
};
</script>
