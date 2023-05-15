<template>
  <div class="card">
    <div class="card-body d-flex flex-column gap-3">
      <div>
        <p class="m-0">Renting price: <PriceFormatted :price="machine.priceWashingDrying" notation="compact" /></p>
      </div>

      <hr/>
      <div v-if="isAuthenticated">
        
        <div v-if="isCurrentUserMachineOwner(machine.userId, user.id)">
          <div class="forms-inputs mb-4">
            <label for="time-slot" class="font-weight-bold mb-2 " style="text-align: center; font-size: 20px;">Add more time slots for your machine:</label>
            <div class="d-flex flex-column align-items-center mt-3">
              <TimeSlotSelector id="time-slot" @update="handleDateTimeUpdate"/>
            </div>

            <br/>
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

          <div class="dropdown-menu" aria-labelledby="timeslotDropdown" style="max-height: 280px; overflow-y: auto; width: 90%; text-align: center;">
            <a
              class="dropdown-item"
              v-for="timeSlot in availableSlots"
              :key="timeSlot.id"
            >
            {{ new Date(timeSlot.timeSlot).toLocaleString() }}
            </a>
          </div>
        </div>

        <div v-else>
          <div v-if="!areThereAvailableSlots()" class="alert alert-primary mt-3" role="alert">
            <p>Sorry, there are no available time slots for this machine at the moment...</p>
          </div>

          <div v-else>
            <span class="mx-2">Select an appointment:</span><br/>
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

            <div class="dropdown-menu" aria-labelledby="timeslotDropdown" style="max-height: 280px; overflow-y: auto; width: 90%; text-align: center;">
              <a
                class="dropdown-item"
                v-for="timeSlot in availableSlots"
                :key="timeSlot.id"
                @click="selectTimeSlot(timeSlot.timeSlot)"
              >
              {{ new Date(timeSlot.timeSlot).toLocaleString() }}
              </a>
            </div>

            <br/>
            <br/>
            <button class="btn btn-outline-primary w-100 mb-1">Book this machine</button>
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
  </div> 

</template>

<script setup>
import { storeToRefs } from "pinia";
import axios from "../../utils/axios.js";
import { ref, computed } from "vue";
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


const { isAuthenticated } = storeToRefs(useAuth());
const user = ref(fetchUser());

async function fetchUser() {
  try {
    const response = await axios.get("/auth/me");
    user.value = response.data;
  } catch (error) {
    console.log("An error has occured");
    console.error(error);
    user.value = {};
  }
  return user.value;
}

function isCurrentUserMachineOwner(machineUserId, currentUserId) {
  return machineUserId === currentUserId;
}



const { getMachineById } = useMachinesStore();
const machine = getMachineById(props.id);

const timeSlots = ref(getTimeSlots(props.id));
const selectedTimeSlot = ref("");
const newTimeSlot = ref(new Date());


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
  return timeSlots.value.filter((slot) => slot.isAvailable);
});

function selectTimeSlot(slot) {
  const slotDate = new Date(slot);
  selectedTimeSlot.value = slotDate.toLocaleString();
}

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
  }
  else {
    alert("Please select a future date and time.");
  }
}

</script>
