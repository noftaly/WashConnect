<template>
		<div class="card border-0 mb-3">
			<div class="row g-0">
				<div class="col-md-4">
					<img :src="machineSelected.imgUrl.length > 0 ? machineSelected.imgUrl : AdCover" class="img-fluid rounded-start h-100" style="object-fit: cover" alt="Machine" />
				</div>
				<div class="col-md-8">
					<div class="card-body border-0">
						<!-- <h5 v-if="historyMachine.machineType === 'WASHING_MACHINE'" class="card-title"><span> -->
								<!-- <SvgWash /> -->
							<!-- </span>{{ dayAppointment.toDateString() }} at {{ hourAppointment }}:{{ minuteAppointment }}</h5> -->
						<!-- <h5 v-else class="card-title"><span> -->
								<!-- <SvgDry /> -->
							<!-- </span>{{ dayAppointment.toDateString() }} at {{ hourAppointment }}:{{ minuteAppointment }}</h5> -->
						<h5 class="card-title">{{ machineSelected.adTitle }}</h5>
						<h6 class="card-subtitle  mt-4 text-body-secondary">About this machine</h6>
						<p class="card-text">
							{{ machineSelected.adDescription }}
						</p>
						<ul class="list-group">
							<li class="list-group-item d-flex align-items-center gap-2">
								<span class="d-flex">
									{{ usersMachine.username }}
								</span>
							</li>
							<li class="list-group-item d-flex align-items-center gap-2">
								<span>
									{{ addressMachine.line1 }}, {{ addressMachine.zip }}, {{ addressMachine.city }}
								</span>
							</li>
							<li class="list-group-item d-flex align-items-center gap-2" v-if="machineSelected.hasWasher">
								<span>
									Washing Price: {{ machineSelected.priceWashing }}€
								</span>
							</li>
							<li class="list-group-item d-flex align-items-center gap-2" v-if="machineSelected.hasWasher">
								<span>
									Washing Duration: {{ machineSelected.washingDuration }}min
								</span>
							</li>
							<li class="list-group-item d-flex align-items-center gap-2" v-if="machineSelected.detergentIncluded">
								<span>
									Detergent included
								</span>
							</li>
							<li class="list-group-item d-flex align-items-center gap-2" v-if="machineSelected.hasWasher">
								<span>
									Capacity: {{ machineSelected.maxCapacity }}kg
								</span>
							</li>
							<li class="list-group-item d-flex align-items-center gap-2" v-if="machineSelected.hasDryer">
								<span>
									Drying Price: {{ machineSelected.priceDrying }}€
								</span>
							</li>
							<li class="list-group-item d-flex align-items-center gap-2" v-if="machineSelected.hasDryer">
								<span>
									Drying Duration: {{ machineSelected.dryDuration }}min
								</span>
							</li>
						</ul>
						<div>
							<button :disabled="disabled" @click="seeReservation" type="button" class="btn btn-outline-primary w-50 mt-4">
								Make a reservation
							</button>
						</div>
					</div>
				</div>
			</div>
			<Overlay v-model:active="active" :removeOverflow="true" >
				<FormMachineReserved
					:machineSelected="machineSelected"
					:usersMachine="usersMachine"
					:addressMachine="addressMachine"
					:timeSlots="timeSlots"
					@closeModal="closeModal"
				/>
			</Overlay>
		</div>
</template>

<script setup>
import AdCover from "../../assets/mocked_ad_img.jpg";
import Overlay from "../utils/Overlay.vue";
import { ref, computed } from "vue";
import FormMachineReserved from './FormMachineReserved.vue';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();

const props = defineProps({
	machineSelected: {type: Object, required: true},
	usersMachine: {type: Object, required: true},
	addressMachine: {type: Object, required: true},
	timeSlots: {type: Array, required: true}
})

const active = ref(false);

const seeReservation = () => {
	active.value = true;
}

const closeModal = () => {
	active.value = false;
}

const disabled = computed(() => authStore.user.id === props.machineSelected.userId ? true : false)

</script>