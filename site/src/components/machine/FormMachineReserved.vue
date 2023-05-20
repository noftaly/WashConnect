<template>
  <div class="w-100">
    <div v-if="machineSelected" class="row g-0 justify-content-center">
      <div class="card-body d-flex flex-column w-100">
        <h5 class="card-title">{{ machineSelected.adTitle }}</h5>
        <p class="card-text">
          {{ addressMachine }}
        </p>
        <p class="card-text d-flex flex-row gap-3"></p>
        <form>
          <div class="input-group mb-3">
            <select class="form-select" v-model="selectedOption">
              <option selected disabled value="">Choose Your Program</option>
              <option v-if="machineSelected.hasWasher">Wash</option>
              <option v-if="machineSelected.hasDryer">Dry</option>
              <option v-if="machineSelected.hasWasher && machineSelected.hasDryer">Wash & Dry</option>
            </select>
          </div>

          <div class="card-text mb-4" v-if="selectedOption === 'Wash'">
            You will pay: <strong> <PriceFormatted :price="machineSelected.priceWashing" notation="compact" /></strong>
          </div>
          <div class="card-text mb-4" v-else-if="selectedOption === 'Dry'">
            You will pay: <strong> <PriceFormatted :price="machineSelected.priceDrying" notation="compact" /></strong>
          </div>
          <div class="card-text mb-4" v-else-if="selectedOption === 'Wash & Dry'">
            You will pay:
            <strong> <PriceFormatted :price="machineSelected.priceWashingDrying" notation="compact" /> </strong>
          </div>

          <span class="mx-2">Select an appointment:</span><br />
          <button
            class="btn btn-primary dropright dropdown-toggle mb-4 justify-content-center w-100"
            type="button"
            id="timeslotDropdown"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {{ selectedTimeSlot || "Time Slot" }}
          </button>

          <div
            class="dropdown-menu"
            aria-labelledby="timeslotDropdown"
            style="max-height: 280px; overflow-y: auto; width: 90%; text-align: center"
          >
            <a
              class="dropdown-item"
              v-for="timeSlot in availableSlots"
              :key="timeSlot.id"
              @click="selectTimeSlot(timeSlot.timeSlot)"
            >
              {{ new Date(timeSlot.timeSlot).toLocaleString() }}
            </a>
          </div>

          <div>
            <div class="alert alert-warning" v-if="!canPay && selectedOption">You don't have enough money to pay</div>

            <button
              :disabled="disabled"
              @click="reserve"
              type="button"
              class="btn btn-outline-primary w-50 mt-2 d-flex justify-content-center"
              style="font-size: 20px"
            >
              Reserve
            </button>
            <div></div>
          </div>
        </form>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import router from "../../router/index.js";
import { useToast } from "vue-toastification";

import { useReservationsStore } from "../../stores/reservations";
import PriceFormatted from "../formatters/PriceFormatted.vue";
import { useTimeSlotsStore } from "../../stores/timeslots";
import { storeToRefs } from "pinia";
import { useAuth } from "../../utils/useAuthHook";

const { user } = useAuth();
const { createReservation } = useReservationsStore();

const { getTimeSlots } = useTimeSlotsStore();
const { timeSlots } = storeToRefs(useTimeSlotsStore());
getTimeSlots(props.machineSelected.id);

const props = defineProps({
  machineSelected: { type: Object, required: true },
  addressMachine: { type: String, required: true },
});
const emits = defineEmits(["closeModal"]);

const selectedOption = ref("");
const selectedTimeSlot = ref("");
const availableSlots = computed(() => timeSlots.value.filter((slot) => slot.isAvailable));
const timeSlotId = ref(0);

const canPay = ref(false);

function translateSelectedOption(selectedOption) {
  let machineType;

  switch (selectedOption) {
    case "Wash":
      machineType = "WASH";
      break;
    case "Dry":
      machineType = "DRY";
      break;
    case "Wash & Dry":
      machineType = "WASHANDDRY";
      break;
    default:
      machineType = "";
  }

  return machineType;
}

const pricePaiement = computed(() =>
  selectedOption.value === "Wash"
    ? props.machineSelected.priceWashing
    : selectedOption.value === "Dry"
    ? props.machineSelected.priceDrying
      ? props.machineSelected.priceWashingDrying
      : selectedOption.value === "Wash & Dry"
    : 0
);

const disabled = computed(() => {
  if (canPay.value === true) {
    if (selectedOption.value === "" || selectedTimeSlot.value === "") {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
});

watch(pricePaiement, (value) => {
  canPay.value = user.balance - value >= 0;
});

function selectTimeSlot(slot) {
  const slotDate = new Date(slot);
  selectedTimeSlot.value = slotDate.toLocaleString();
  timeSlotId.value = getTimeSlotId(selectedTimeSlot.value, timeSlots.value);
}

function getTimeSlotId(timeSlot, timeSlots) {
  for (let i = 0; i < timeSlots.length; i++) {
    if (new Date(timeSlots[i].timeSlot).toLocaleString() === timeSlot) {
      return timeSlots[i].id;
    }
  }
  return null; // Return null if no matching time slot is found
}

onMounted(() => {});

async function reserve() {
  await createReservation(translateSelectedOption(selectedOption.value), timeSlotId.value);
  emits("closeModal");
  router.push({ name: "history" });
  useToast().success("Machine reserved successfully !");
}
</script>
