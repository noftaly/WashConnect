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
            :description="machine.adDescription"
            :user-id="machine.userId"
            :address="machine.address"
          />
          <hr />
          <h6>About this machine:</h6>
          <MachineDetailsCharacteristics :characteristic="machineCharacteristics" />
        </div>
        <div class="col-2">
          <div class="sticky">
            <MachineDetailsPayment :id="id" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="machine" class="small-screen">
      <h1 class="text-center my-5">{{ machine.adTitle }}</h1>
      <img src="../../assets/mocked_ad_img.jpg" class="img-fluid" />

      <div class="small-screen-details">
        <div class="row justify-content-between align-items-center">
          <div>
            <MachineDetailsHeader
              :description="machine.adDescription"
              :user-id="machine.userId"
              :address="machine.address"
            />
          </div>
          <div>
            <MachineDetailsPayment :id="id" />
          </div>
        </div>
        <hr />
        <h5 class="mt-3">About this machine:</h5>
        <MachineDetailsCharacteristics :characteristic="machineCharacteristics" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { defineAsyncComponent, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "../../utils/axios.js";

const id = Number(useRoute().params.id);

const machine = ref(null);
const machineCharacteristics = ref(null);

axios.get(`/machines/${id}`).then((response) => {
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

const MachineDetailsHeader = defineAsyncComponent(() => import("../../components/machine/MachineDetailsHeader.vue"));
const MachineDetailsCharacteristics = defineAsyncComponent(() =>
  import("../../components/machine/MachineDetailsCharacteristics.vue")
);
const MachineDetailsPayment = defineAsyncComponent(() => import("../../components/machine/MachineDetailsPayment.vue"));
</script>

<style scoped>
@media (max-width: 992px) {
  .sticky {
    position: static;
  }

  .large-screen {
    display: none;
  }

  .small-screen {
    display: block;
  }

  .small-screen-details {
    margin-top: 20px;
  }
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
