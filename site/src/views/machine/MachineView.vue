<template>
  <main class="mx-3 my-5">
    <div v-if="machine" class="large-screen">
      <h1 class="text-center my-5">{{ machine.adTitle }}</h1>
      <div class="row">
        <div class="col-5">
          <div class="d-flex flex-column">
            <img src="../../assets/mocked_ad_img.jpg" class="img-fluid" />
            <!-- <MachineDetailsCharacteristics :characteristic="machineCharacteristics" /> -->
          </div>
        </div>
        <div class="col-5">
          <MachineDetailsHeader
            :price="machine.priceWashingDrying"
            :description="machine.adDescription"
            :address-id="addressId"
          />
          <hr />
          <h6>About this machine:</h6>
          <MachineDetailsCharacteristics :characteristic="machineCharacteristics" />
        </div>
        <div class="col-2">
          <div class="sticky">
            <machineDetailsPayment :id="machine.id" />
            <!-- <div v-if="isAdmin" class="mt-4">
              <RouterLink class="btn btn-outline-secondary w-100" :to="`/admin/machines/${id}`"
                  >Edit machine</RouterLink>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <div v-if="machine" class="small-screen">
      <h1 class="text-center my-5">{{ adTitle }}</h1>

      <img src="../../assets/mocked_ad_img.jpg" class="img-fluid" />

      <MachineDetailsHeader :price="priceWashingDrying" :description="adDescription" :address-id="addressId" />

      <MachineDetailsPayment :id="machine.id" />

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

import { useAuth } from "../../utils/useAuthHook.js";
import { useMachinesStore } from "../../stores/machines.js";

const { machine } = storeToRefs(useMachinesStore());
const { clearMachine, fetchMachine } = useMachinesStore();

// clearMachine();

const id = Number(useRoute().params.id);
async function loadMachine() {
  clearMachine();
  await fetchMachine(id);
}

loadMachine();

console.log(machine.adDescription);
// fetchMachine(id);

const machineCharacteristics = {
  hasWasher: machine.hasWasher,
  hasDryer: machine.hasDryer,
  maxCapacity: machine.maxCapacity,
  washDuration: machine.washDuration,
  dryDuration: machine.dryDuration,
  detergentIncluded: machine.detergentIncluded,
};
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
