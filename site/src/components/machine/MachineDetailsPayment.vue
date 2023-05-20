<template>
  <div class="card">
    <div v-if="machine" class="card-body d-flex flex-column gap-3">
      <div>
        <p class="m-0 mb-1">Renting price:</p>
        <ul class="list-group">
          <li class="list-group-item d-flex align-items-center gap-2" v-if="machine.hasWasher == true">
            Washing Price: <PriceFormatted :price="machine.priceWashing" notation="compact" />
          </li>
          <li class="list-group-item d-flex align-items-center gap-2" v-if="machine.hasDryer == true">
            Drying Price: <PriceFormatted :price="machine.priceDrying" notation="compact" />
          </li>
          <li
            class="list-group-item d-flex align-items-center gap-2"
            v-if="machine.hasWasher == true && machine.hasDryer == true"
          >
            Washing & Drying Price: <PriceFormatted :price="machine.priceWashingDrying" notation="compact" />
          </li>
        </ul>
      </div>

      <hr />
      <div v-if="isAuthenticated">
        <div v-if="isCurrentUserMachineOwner(machine.userId, user.id)">
          <div class="forms-inputs mb-4">
            <label for="time-slot" class="font-weight-bold mb-2" style="text-align: center; font-size: 20px"
              >Add more time slots for your machine:</label
            >
            <div class="d-flex flex-column align-items-center mt-3">
              <TimeSlotSelector id="time-slot" @update="handleDateTimeUpdate" />
            </div>

            <br />
            <button class="btn btn-primary w-100 mb-1" @click="createNewTimeSlot(machine)">Add time slot</button>
          </div>

          <button
            class="btn btn-secondary dropright dropdown-toggle mb-4 justify-content-center w-100"
            type="button"
            id="timeslotDropdown"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Current Time Slots
          </button>

          <div
            class="dropdown-menu"
            aria-labelledby="timeslotDropdown"
            style="max-height: 280px; overflow-y: auto; width: 90%; text-align: center"
          >
            <a class="dropdown-item" v-for="timeSlot in availableSlots" :key="timeSlot.id">
              {{ new Date(timeSlot.timeSlot).toLocaleString() }}
            </a>
          </div>
        </div>

        <div v-else>
          <div v-if="!areThereAvailableSlots()" class="alert alert-primary mt-3" role="alert">
            <p>Sorry, there are no available time slots for this machine at the moment...</p>
          </div>

          <div v-else>
            <span class="text-muted">You will be able to choose a time slot when confirming your reservation.</span
            ><br />
            <button
              class="btn btn-secondary dropright dropdown-toggle mt-2 mb-4 justify-content-center w-100"
              type="button"
              id="timeslotDropdown"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Consult available Time Slots
            </button>

            <div
              class="dropdown-menu"
              aria-labelledby="timeslotDropdown"
              style="max-height: 280px; overflow-y: auto; width: 90%; text-align: center"
            >
              <a class="dropdown-item" v-for="timeSlot in availableSlots" :key="timeSlot.id">
                {{ new Date(timeSlot.timeSlot).toLocaleString() }}
              </a>
            </div>

            <br />
            <br />
            <RouterLink :to="`/reservations/${id}`">
              <button class="btn btn-outline-primary w-100 mb-1" style="font-size: 20px">Go to reservation</button>
            </RouterLink>
          </div>
        </div>
      </div>

      <div v-else>
        <p>
          Please <RouterLink to="/login">login</RouterLink> or <RouterLink to="/register">register</RouterLink> to book
          this machine.
        </p>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import axios from "../../utils/axios.js";
import { ref, computed, watchEffect } from "vue";
import { useToast } from "vue-toastification";

import PriceFormatted from "../formatters/PriceFormatted.vue";
import TimeSlotSelector from "../machine/timeSlotSelector.vue";

import { useAuth } from "../../utils/useAuthHook.js";
import { useMachinesStore } from "../../stores/machines.js";
import { useTimeSlotsStore } from "../../stores/timeslots.js";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const { isAuthenticated, user } = storeToRefs(useAuth());

function isCurrentUserMachineOwner(machineUserId, currentUserId) {
  return machineUserId === currentUserId;
}

const { fetchMachine } = useMachinesStore();
const { machine } = storeToRefs(useMachinesStore());
fetchMachine(props.id);

const timeSlots = ref(null);
const newTimeSlot = ref(new Date());

watchEffect(() => {
  if (isAuthenticated.value) {
    timeSlots.value = getTimeSlots(props.id);
  }
});

async function getTimeSlots(machineId) {
  try {
    const response = await axios.get(`/timeslots/${machineId}`);
    timeSlots.value = response.data;
  } catch (error) {
    console.log("An error has occured");
    console.error(error);
    timeSlots.value = [];
  }
  return timeSlots.value;
}

const availableSlots = computed(() => {
  if (Array.isArray(timeSlots.value)) {
    return timeSlots.value.filter((slot) => slot.isAvailable);
  }
  return []; // Return an empty array if timeSlots.value is not an array
});

function areThereAvailableSlots() {
  return availableSlots.value.length > 0;
}

const { createTimeSlot } = useTimeSlotsStore();
const machineType = ref("");

function handleDateTimeUpdate(dateTime) {
  newTimeSlot.value = dateTime;
}

async function createNewTimeSlot(machine) {
  const timeSlot = newTimeSlot.value;
  const now = new Date();

  // Verification of future date
  if (timeSlot != null && timeSlot > now) {
    if (machine.hasWasher == true && machine.hasDryer == true) {
      machineType.value = "WASHANDDRY";
    } else if (machine.hasWasher == true && machine.hasDryer == false) {
      machineType.value = "WASH";
    } else if (machine.hasDryer == true && machine.hasWasher == false) {
      machineType.value = "DRYER";
    }

    await createTimeSlot(machine.id, timeSlot.toISOString(), machineType.value);
    newTimeSlot.value = new Date();
    window.location.reload();
    useToast().success("Time Slot added successfully!");
  } else {
    alert("Please select a future date and time.");
  }
}
</script>
