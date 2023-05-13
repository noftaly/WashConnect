<template>
  <main class="mx-3 my-5">
    <div v-if="machine" class="large-screen">
      <h1 class="text-center my-5">{{ machine.adTitle }}</h1>
      <div class="row">
        <div class="col-5">
          <div class="d-flex flex-column">
            <img src="../../assets/mocked_ad_img.jpg" class="img-fluid" />
          </div>
        </div>
        <div class="col-5">
          <MachineDetailsHeader
            :price="machine.priceWashingDrying"
            :description="machine.adDescription"
            :address-id="machine.addressId"
          />
          <hr />
          <h6>About this machine:</h6>
          <MachineDetailsCharacteristics :characteristic="machineCharacteristics" />
        </div>
        <div class="col-2">
          <div class="sticky">
            <MachineDetailsPayment :id="id" />
            <!-- <div v-if="isAdmin" class="mt-4">
              <RouterLink class="btn btn-outline-secondary w-100" :to="`/admin/machines/${id}`"
                  >Edit machine</RouterLink>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <div v-if="machine" class="small-screen">
      <h1 class="text-center my-5">{{ machine.adTitle }}</h1>

      <img src="../../assets/mocked_ad_img.jpg" class="img-fluid" />

      <MachineDetailsHeader
        :price="machine.priceWashingDrying"
        :description="machine.adDescription"
        :address-id="machine.addressId"
      />

      <MachineDetailsCharacteristics :id="id" />

      <h5 class="mt-3">About this machine:</h5>

      <MachineDetailsPayment :characteristic="machineCharacteristics" />

      <!-- <div v-if="isAdmin" class="mt-4">
          <RouterLink class="btn btn-outline-secondary w-100" :to="`/admin/machines/${id}`">Edit machine</RouterLink>
        </div> -->
    </div>
  </main>
</template>

<script setup>
import { defineAsyncComponent, ref } from "vue";
import { useRoute } from "vue-router";
import { useMachinesStore } from "../../stores/machines.js";
import axios from "../../utils/axios.js";

const id = Number(useRoute().params.id);
const { clearMachine, fetchMachine } = useMachinesStore();

const machine = ref(null);
const machineCharacteristics = ref(null);

axios.get(`http://localhost:5050/machines/${id}`).then((response) => {
  machine.value = response.data;
  machineCharacteristics.value = {
    hasWasher: machine.value.hasWasher,
    hasDryer: machine.value.hasDryer,
    maxCapacity: machine.value.maxCapacity,
    washDuration: machine.value.washDuration,
    dryDuration: machine.value.dryDuration,
    detergentIncluded: machine.value.detergentIncluded,
  };
});

const MachineDetailsHeader = defineAsyncComponent(() =>
  import("../../components/machine/MachineDetailsHeader.vue")
);
const MachineDetailsCharacteristics = defineAsyncComponent(() =>
  import("../../components/machine/MachineDetailsCharacteristics.vue")
);
const MachineDetailsPayment = defineAsyncComponent(() =>
  import("../../components/machine/MachineDetailsPayment.vue")
);
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
