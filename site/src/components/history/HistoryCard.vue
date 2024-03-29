<template>
  <div class="card-body">
    <div class="card mb-3">
      <div class="row g-0">
        <!-- <div class="col-md-4">
          <img
            :src="AdCover"
            class="img-fluid rounded-start"
            style="object-fit: cover; width=100%; height=100%;"
            alt="Machine"
          />
        </div> -->
        <div class="col-md-10">
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <div>
                <h5 v-if="historyMachine.machineType === 'WASHING_MACHINE'" class="card-title">
                  <span> <SvgWash /> </span>{{ dayAppointment.toDateString() }} at {{ hourAppointment }}:{{
                    minuteAppointment
                  }}
                </h5>
                <h5 v-else class="card-title">
                  <span> <SvgDry /> </span>{{ dayAppointment.toDateString() }} at {{ hourAppointment }}:{{
                    minuteAppointment
                  }}
                </h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">{{ machineAppointment.adTitle }}</h6>
                <p class="card-text mb-2">
                  {{ machineAppointment.adDescription }}
                </p>
              </div>
            </div>

            <ul class="list-group">
              <li class="list-group-item d-flex align-items-center gap-2">
                <span class="d-flex">
                  <span>
                    <font-awesome-icon icon="fa-solid fa-euro-sign" />
                  </span>
                </span>
                <span v-if="historyMachine.machineType === 'WASHING_MACHINE'">
                  {{ machineAppointment.priceWashing }}
                </span>
                <span v-else>
                  {{ machineAppointment.priceDrying }}
                </span>
              </li>
              <li
                class="list-group-item d-flex align-items-center gap-2"
                v-if="machineAppointment.detergentIncluded && historyMachine.machineType === 'WASHING_MACHINE'"
              >
                <span class="d-flex">
                  <SvgDetergent />
                </span>
                included
              </li>
              <li
                class="list-group-item d-flex align-items-center gap-2"
                v-else-if="!machineAppointment.detergentIncluded && historyMachine.machineType === 'WASHING_MACHINE'"
              >
                <span>
                  <SvgDetergent />
                </span>
                not included
              </li>
              <li class="list-group-item d-flex align-items-center gap-2">
                <span>
                  <font-awesome-icon icon="fa-solid fa-clock" />
                </span>
                {{ machineAppointment.washDuration }} min
              </li>
              <li class="list-group-item d-flex align-items-center gap-2">
                <span>
                  <font-awesome-icon icon="fa-solid fa-weight-scale" />
                </span>
                {{ machineAppointment.maxCapacity }} kg
              </li>
              <li class="list-group-item d-flex align-items-center gap-2">
                <span>
                  <font-awesome-icon icon="fa-solid fa-location-dot" />
                </span>
                {{ machineAddressStr }}
              </li>
            </ul>
          </div>
        </div>
        <div class="col-md-2 text-center my-auto">
          <button class="btn btn-outline-danger mb-4" @click="cancelReservation">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AdCover from "../../assets/mocked_ad_img.jpg";
import SvgWash from "../../svg/SvgWash.vue";
import SvgDry from "../../svg/SvgDry.vue";
import SvgDetergent from "../../svg/SvgDetergent.vue";

import { computed } from "vue";
import { useReservationsStore } from "../../stores/reservations";
import { useToast } from "vue-toastification";

const props = defineProps({
  history: { type: Object, required: true },
});

const historyMachine = computed(() => props.history);

const dayAppointment = computed(() => new Date(historyMachine.value.timeSlot));
const hourAppointment = computed(() => dayAppointment.value.getHours());
const minuteAppointment = computed(() => dayAppointment.value.getMinutes());

const machineAppointment = computed(() => historyMachine.value.machine);

const machineAddressStr = computed(() => {
  const { line1, zip, city, country } = historyMachine.value.machine.address;
  return `${line1}, ${zip} ${city}, ${country}`;
});

const { removeReservation } = useReservationsStore();
const cancelReservation = () => {
  removeReservation(historyMachine.value.id);
  useToast().success("Reservation canceled and refunded!");
};
</script>
