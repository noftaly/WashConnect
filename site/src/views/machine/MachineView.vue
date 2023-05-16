<template>
  <main class="mx-3 my-5">
	<div v-if="bookingProgress.machine">
		<MachineReservedCard
			:machineSelected="bookingProgress.machine"
			:usersMachine="bookingProgress.userName"
			:addressMachine="bookingProgress.address"
			:timeSlots="bookingProgress.timeSlots"
		/>
	</div>
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useAuth } from "../../utils/useAuthHook.js";
import { useMachinesStore } from "../../stores/machines.js";
import MachineReservedCard from '../../components/machine/MachineReservedCard.vue';

const { isAdmin } = storeToRefs(useAuth());
const { bookingProgress } = storeToRefs(useMachinesStore());
const { clearMachine, fetchMachine } = useMachinesStore();

clearMachine();

const id = Number(useRoute().params.id);
fetchMachine(id);
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
