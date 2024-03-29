<template>
  <div v-if="machineSelected" class="card border-0 mb-3">
    <div class="row g-0">
      <div class="col-md-4">
        <img
          :src="AdCover"
          class="img-fluid rounded-start"
          style="object-fit: cover; width: 100%; height: 100%"
          alt="Machine"
        />
      </div>
      <div class="col-md-8">
        <div class="card-body border-0">
          <h5 class="card-title">{{ machineSelected.adTitle }}</h5>
          <h6 class="card-subtitle mt-4 text-body-secondary">About this machine:</h6>
          <p class="card-text">
            {{ machineSelected.adDescription }}
          </p>
          <ul class="list-group">
            <li class="list-group-item d-flex align-items-center gap-2">
              <span> Posted by {{ machineSelected.user.username }} </span>
            </li>
            <li class="list-group-item d-flex align-items-center gap-2">
              <span> Located at {{ addressStr }} </span>
            </li>
            <li class="list-group-item d-flex align-items-center gap-2" v-if="machineSelected.hasWasher == true">
              <span> Washing Price: <PriceFormatted :price="machineSelected.priceWashing" notation="compact" /> </span>
            </li>
            <li class="list-group-item d-flex align-items-center gap-2" v-if="machineSelected.hasWasher == true">
              <span> Washing Duration: {{ machineSelected.washDuration }} min </span>
            </li>
            <li class="list-group-item d-flex align-items-center gap-2" v-if="machineSelected.detergentIncluded">
              <span> Detergent included </span>
            </li>
            <li
              class="list-group-item d-flex align-items-center gap-2"
              v-if="machineSelected.hasWasher == true || machineSelected.hasDryer == true"
            >
              <span> Max Capacity: {{ machineSelected.maxCapacity }} kg </span>
            </li>
            <li class="list-group-item d-flex align-items-center gap-2" v-if="machineSelected.hasDryer == true">
              <span> Drying Price: <PriceFormatted :price="machineSelected.priceDrying" notation="compact" /> </span>
            </li>
            <li class="list-group-item d-flex align-items-center gap-2" v-if="machineSelected.hasDryer == true">
              <span> Drying Duration: {{ machineSelected.dryDuration }} min </span>
            </li>
          </ul>
          <div>
            <button
              :disabled="disabled"
              @click="seeReservation"
              type="button"
              class="btn btn-outline-primary w-100 mt-4"
              style="font-size: 20px"
            >
              Make a reservation
            </button>
            <p v-if="disabled" class="alert alert-warning mt-3 justify-content-center" role="alert">
              You cannot reserve your own machine!
            </p>
          </div>
        </div>
      </div>
    </div>
    <TransitionOverlay v-model:active="active" :removeOverflow="true">
      <FormMachineReserved :machineSelected="machineSelected" :addressMachine="addressStr" @closeModal="closeModal" />
    </TransitionOverlay>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script setup>
import AdCover from "../../assets/mocked_ad_img.jpg";
import TransitionOverlay from "../utils/TransitionOverlay.vue";

import { ref, computed } from "vue";
import FormMachineReserved from "./FormMachineReserved.vue";

import PriceFormatted from "../formatters/PriceFormatted.vue";
import { storeToRefs } from "pinia";
import { useAuth } from "../../utils/useAuthHook";

const { user } = storeToRefs(useAuth());

const props = defineProps({
  machineSelected: { type: Object, required: false },
});

const addressStr = computed(() => {
  const { line1, zip, city, country } = props.machineSelected.address;
  return `${line1}, ${zip} ${city}, ${country}`;
});

const active = ref(false);

const seeReservation = () => {
  active.value = true;
};

const closeModal = () => {
  active.value = false;
};

const disabled = computed(() => user.value.id === props.machineSelected.userId);
</script>
