<template>
  <main class="mx-3 my-5">
    <div v-if="machine" class="large-screen">
      <h1 class="text-center my-5">{{ machine.data.adTitle }}</h1>
      <div class="row">
        <div class="col-5">
          <div class="d-flex flex-column">
            <img src="../../assets/mocked_ad_img.jpg" class="img-fluid" />
          </div>
        </div>
        <div class="col-5">
          <MachineDetailsHeader
            :price="machine.data.priceWashingDrying"
            :description="machine.data.adDescription"
            :address-id="machine.data.addressId"
          />
          <hr />
          <h6>About this machine:</h6>
          <MachineDetailsCharacteristics :characteristic="machineCharacteristics" />
        </div>
        <div class="col-2">
          <div class="sticky">
            <machineDetailsPayment :id="id" />
            <!-- <div v-if="isAdmin" class="mt-4">
              <RouterLink class="btn btn-outline-secondary w-100" :to="`/admin/machines/${id}`"
                  >Edit machine</RouterLink>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <div v-if="machine" class="small-screen">
      <h1 class="text-center my-5">{{ machine.data.adTitle }}</h1>

      <img src="../../assets/mocked_ad_img.jpg" class="img-fluid" />

      <MachineDetailsHeader :price="machine.priceWashingDrying" :description="machine.data.adDescription" :address-id="machine.data.addressId" />

      <MachineDetailsPayment :id="id" />

      <h5 class="mt-3">About this machine:</h5>

      <MachineDetailsCharacteristics :characteristic="machineCharacteristics" />

      <!-- <div v-if="isAdmin" class="mt-4">
          <RouterLink class="btn btn-outline-secondary w-100" :to="`/admin/machines/${id}`">Edit machine</RouterLink>
        </div> -->
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

import MachineDetailsCharacteristics from "../../components/machine/MachineDetailsCharacteristics.vue";
import MachineDetailsHeader from "../../components/machine/MachineDetailsHeader.vue";
import MachineDetailsPayment from "../../components/machine/MachineDetailsPayment.vue";

import { useMachinesStore } from "../../stores/machines.js";
import axios from "axios";

const id = Number(useRoute().params.id);
const machine = await axios.get(`http://localhost:5050/machines/${id}`);
const { clearMachine, fetchMachine } = useMachinesStore();

console.log(machine.data);


const machineCharacteristics = {
  hasWasher: machine.data.hasWasher,
  hasDryer: machine.data.hasDryer,
  maxCapacity: machine.data.maxCapacity,
  washDuration: machine.data.washDuration,
  dryDuration: machine.data.dryDuration,
  detergentIncluded: machine.data.detergentIncluded,
};

//EXAMPLE - Tu as tout ce qu'il faut pour la suite
console.log("Exemple : "+ machineCharacteristics.washDuration);
</script>

<style scoped>
@media (max-width: 992px) {
  .sticky {
    position: static;
  }
}

.large-screen {
  display: none;
}

.small-screen {
  display: block;
}

@media (min-width: 992px) {
  .large-screen {
    display: block;
  }

  .small-screen {
    display: none;
  }
}
</style>
