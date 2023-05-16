<template>
  <main class="container my-5">
    <div class="d-flex justify-content-center">
      <img class="mt-5" style="width: 25%" src="../../assets/Logo_WashConnect.png" />
    </div>
    <h1 class="text-center mt-5">Confirm your reservation!</h1>

    <br/>
    <!-- <MachineCard v-bind="machine"></MachineCard> -->
    <MachineReservedCard :machineSelected="machine"></MachineReservedCard>

    <!-- Payment -->
    <div class="mt-5">
      <div class="alert alert-warning alert-sm text-center" role="alert">
        By clicking the button below, {{ machine.priceWashingDrying }} € will be deducted from your balance.
      </div>
      <div class="d-flex justify-content-center">
        <button class="btn btn-primary btn-lg">Book</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import axios from "../../utils/axios.js";

import router from "../../router/index.js";
import { useAuth } from "../../utils/useAuthHook.js";
import { useMachinesStore } from "../../stores/machines.js";
import MachineCard from "../../components/machine/MachineCard.vue";
import MachineReservedCard from "../../components/machine/MachineReservedCard.vue";

const { isAuthenticated } = storeToRefs(useAuth());
if (!isAuthenticated.value) {
  router.push({ title: "login" });
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

onMounted(() => {
  getMachineById();
});
</script>

<script>
export default {
  components: {
    MachineCard,
    MachineReservedCard,
  },
};
</script>
``
