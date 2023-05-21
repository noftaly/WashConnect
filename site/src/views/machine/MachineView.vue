<template>
  <main class="mx-3 my-5">
    <div v-if="machine" class="large-screen">
      <h1 class="text-center my-5">{{ machine.adTitle }}</h1>
      <div class="row">
        <div class="col-3">
          <div class="d-flex flex-column">
            <img src="../../assets/mocked_ad_img.jpg" class="img-fluid" />
          </div>
        </div>
        <div class="col-6">
          <MachineDetailsHeader :description="machine.adDescription" :user="machine.user" :address="machine.address" />
          <hr />
          <h6>About this machine:</h6>
          <MachineDetailsCharacteristics :characteristic="machineCharacteristics" />
        </div>
        <div class="col-3">
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
              :user="machine.user"
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
import { ref } from "vue";
import { useRoute } from "vue-router";
import MachineDetailsHeader from "../../components/machine/MachineDetailsHeader.vue";
import MachineDetailsCharacteristics from "../../components/machine/MachineDetailsCharacteristics.vue";
import MachineDetailsPayment from "../../components/machine/MachineDetailsPayment.vue";
import { useMachinesStore } from "../../stores/machines";
import { storeToRefs } from "pinia";
import { watch } from "vue";

const id = Number(useRoute().params.id);

const machineCharacteristics = ref(null);

const { fetchMachine } = useMachinesStore();
const { machine } = storeToRefs(useMachinesStore());
if (machine.value) {
  setCharacteristics(machine.value);
} else {
  fetchMachine(id);
}

watch(machine, setCharacteristics);

function setCharacteristics(machine) {
  machineCharacteristics.value = {
    hasWasher: machine.hasWasher,
    hasDryer: machine.hasDryer,
    maxCapacity: machine.maxCapacity,
    washDuration: machine.washDuration,
    dryDuration: machine.dryDuration,
    detergentIncluded: machine.detergentIncluded,
  };
}
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
