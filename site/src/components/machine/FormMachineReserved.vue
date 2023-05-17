<template>
	<div class="w-100">
		<div class="row g-0 justify-content-center">
			<div class="card-body d-flex flex-column w-100">
				<h5 class="card-title">{{ machineSelected.adTitle }}</h5>
				<!-- <p class="card-text">
					{{ usersMachine.username }}
				</p> -->
				<p class="card-text">
					{{ addressMachine }}
				</p>
				<p class="card-text d-flex flex-row gap-3">
				</p>
				<form>
					<div class="input-group mb-3">
						<select class="form-select" v-model="selectedOption">
							<option selected disabled value="">Choose Your Program</option>
							<option v-if="machineSelected.hasWasher">Wash</option>
							<option v-if="machineSelected.hasDryer">Dry</option>
							<option v-if="machineSelected.hasWasher && machineSelected.hasDryer">Wash & Dry</option>
						</select>
					</div>

					<div class="card-text mb-4" v-if="selectedOption === 'Wash'">You will pay: {{
						machineSelected.priceWashing }}€</div>
					<div class="card-text mb-4" v-else-if="selectedOption === 'Dry'">You will pay: {{
						machineSelected.priceDrying }}€</div>
					<div class="card-text mb-4" v-else-if="selectedOption === 'Wash & Dry'">You will pay: {{ 
					machineSelected.priceWashingDrying }}€</div>

					<div class="input-group mb-3">
						<span class="input-group-text" for="selectedDate">Choose a date : </span>
						<input class="form-control" @change="daySelected" type="date" id="selectedDate"
							v-model="selectedDate" :min="minDate" required />
					</div>
					<div class="input-group mb-3">
						<span class="input-group-text" for="selectedTime">Choose a time : </span>
						<select class="form-select" id="selectedTime" v-model="selectedTime" required>
							<option v-for="time in availableTimes" :value="time">{{ time }}</option>
						</select>
					</div>
					<div>
						<div v-if="!canPay && selectedOption !== '' && selectedDate !== '' && selectedTime !== ''">
							You don't have enough money to pay
						</div>

						<button :disabled="disabled" @click="reserve" type="button"
							class="btn btn-outline-primary w-50 mt-2">
							Reserve
						</button>
						<div>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { useAuthStore } from '../../stores/auth';
import { useMachinesStore } from '../../stores/machines';

const authStore = useAuthStore();
const machineStore = useMachinesStore();

const user = authStore.user;

const props = defineProps({
	machineSelected: { type: Object, required: true },
	addressMachine: { type: String, required: true },
	// usersMachine: { type: Object, required: true },
	// addressMachine: { type: Object, required: true },
	// timeSlots: { type: Array, required: true }
})
const emits = defineEmits(['closeModal'])


const selectedOption = ref('');
const selectedDate = ref('');
const selectedTime = ref('');
const canPay = ref(false);
const bookedTimes = ref([]);
const currentDate = new Date();

const pricePaiement = computed(() => selectedOption.value === 'Wash' ? props.machineSelected.priceWashing : selectedOption.value === 'Dry' ? props.machineSelected.priceDrying
 ? props.machineSelected.priceWashingDrying : selectedOption.value === 'Wash & Dry' : 0)


const disabled = computed(() => {
	if ( canPay.value === true) {
		if( selectedOption.value === '' || selectedDate.value === '' || selectedTime.value === '') {
			return true;
		} else {
			return false;
		}
	} else {
		return true;
	}
});


watch(pricePaiement, value => {
	if (user.balance - value >= 0) {
		canPay.value = true;
	} else {
		canPay.value = false;
	}
})


const availableTimes = computed(() => {
	const allTimes = [
		'09:00',
		'10:00',
		'11:00',
		'12:00',
		'13:00',
		'14:00',
		'15:00',
		'16:00',
		'17:00',
		'18:00',
		'19:00',
		'20:00',
		'21:00',
		'22:00'
	];

	return allTimes.filter((time) => !isTimeBooked(time));
});

const isTimeBooked = (time) => {
	return bookedTimes.value.includes(time);
};

onMounted(() => {


})

const daySelected = () => {
	bookedTimes.value = [];
	// To prevent to reserve from passed hours in the actual Day
	const dateToCompare = new Date(selectedDate.value);
	if (dateToCompare.getFullYear() === currentDate.getFullYear() && dateToCompare.getMonth() === currentDate.getMonth() && dateToCompare.getDate() === currentDate.getDate()) {
		const currentHour = currentDate.getHours();
		for (let i = 0; i <= currentHour; i++) {
			const hourStr = String(i).padStart(2, '0');
			bookedTimes.value.push(`${hourStr}:00`);
		}
	}

	props.timeSlots.map((value) => {
		if (new Date(value.timeSlot).toISOString().split('T')[0] === selectedDate.value) {
			if (value.machineType === "WASHING_MACHINE") {
				const endDate = new Date(value.timeSlot).getTime() + (props.machineSelected.washDuration - 1) * 60000;

				const endBooked = `${new Date(endDate).getHours()}:${new Date(endDate).getMinutes() <10 ? '0' : ''}${new Date(endDate).getMinutes()}`

				const bookedHour = `${new Date(value.timeSlot).getHours()}:${new Date(value.timeSlot).getMinutes() < 10 ? '0': ''}${new Date(value.timeSlot).getMinutes()}`;

				bookedTimes.value.push(bookedHour);
				bookedTimes.value.push(endBooked);
			}
			else if (value.machineType === "DRYER" ) {
				const endDate = new Date(value.timeSlot).getTime() + (props.machineSelected.dryDuration - 1) * 60000;

				const endBooked = `${new Date(endDate).getHours()}:${new Date(endDate).getMinutes() <10 ? '0' : ''}${new Date(endDate).getMinutes()}`

				const bookedHour = `${new Date(value.timeSlot).getHours()}:${new Date(value.timeSlot).getMinutes() < 10 ? '0': ''}${new Date(value.timeSlot).getMinutes()}`;

				bookedTimes.value.push(bookedHour);
				bookedTimes.value.push(endBooked);
			}
		}
	})
}

const reserve = async (event) => {
	const dateParts = selectedDate.value.split('-');
	const timeParts = selectedTime.value.split(':');
	const year = parseInt(dateParts[0]);
	const month = parseInt(dateParts[1]) - 1;
	const day = parseInt(dateParts[2]);
	const hour = parseInt(timeParts[0]);
	const minute = parseInt(timeParts[1]);

	const bookedMachine = {
		typeOfProduct: selectedOption.value.toUpperCase(),
		machineId: props.machineSelected.id,
		timeSlot: new Date(year, month, day, hour, minute)
	}

	const response = await machineStore.bookMachine(bookedMachine);
	if (response) {
		emits('closeModal');
	}
};

const minDate = computed(() => {
	const year = currentDate.getFullYear();
	const month = String(currentDate.getMonth() + 1).padStart(2, '0');
	const day = String(currentDate.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
});


</script>