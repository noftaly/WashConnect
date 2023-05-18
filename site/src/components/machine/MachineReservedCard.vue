<template>
		<div class="card border-0 mb-3">
			<div class="row g-0">
				<div class="col-md-4">
					<img :src="AdCover" class="img-fluid rounded-start h-100" style="object-fit: cover" alt="Machine" />
				</div>
				<div class="col-md-8">
					<div class="card-body border-0">

						<h5 class="card-title">{{ machineSelected.adTitle }}</h5>
						<h6 class="card-subtitle  mt-4 text-body-secondary">About this machine: </h6>
						<p class="card-text">
							{{ machineSelected.adDescription }}
						</p>
						<ul class="list-group">
							<li class="list-group-item d-flex align-items-center gap-2">
								<span>
									Located at {{ addressStr }}
								</span>
							</li>
							<li class="list-group-item d-flex align-items-center gap-2" v-if="machineSelected.hasWasher == true">
								<span>
									Washing Price: <PriceFormatted :price="machineSelected.priceWashing" notation="compact" />
								</span>
							</li>
							<li class="list-group-item d-flex align-items-center gap-2" v-if="machineSelected.hasWasher == true">
								<span>
									Washing Duration: {{ machineSelected.washDuration }} min
								</span>
							</li>
							<li class="list-group-item d-flex align-items-center gap-2" v-if="machineSelected.detergentIncluded">
								<span>
									Detergent included
								</span>
							</li>
							<li class="list-group-item d-flex align-items-center gap-2" v-if="machineSelected.hasWasher == true || machineSelected.hasDryer == true">
								<span>
									Max Capacity: {{ machineSelected.maxCapacity }} kg
								</span>
							</li>
							<li class="list-group-item d-flex align-items-center gap-2" v-if="machineSelected.hasDryer == true">
								<span>
									Drying Price: <PriceFormatted :price="machineSelected.priceDrying" notation="compact" />
								</span>
							</li>
							<li class="list-group-item d-flex align-items-center gap-2" v-if="machineSelected.hasDryer == true">
								<span>
									Drying Duration: {{ machineSelected.dryDuration }} min
								</span>
							</li>
						</ul>
						<div>
							<button :disabled="disabled" @click="seeReservation" type="button" class="btn btn-outline-primary w-100 mt-4" style="font-size: 20px;">
								Make a reservation
							</button>
						</div>
					</div>
				</div>
			</div>
			<Overlay v-model:active="active" :removeOverflow="true" >
				<FormMachineReserved
					:machineSelected="machineSelected"
					:addressMachine="addressStr"
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
import axios from "../../utils/axios.js";
import { useAuthStore } from '../../stores/auth';

import { useUsersStore } from "../../stores/users";
import { useMachinesStore } from "../../stores/machines.js";
import { useAddressesStore } from "../../stores/addresses";
import PriceFormatted from "../formatters/PriceFormatted.vue";

const authStore = useAuthStore();
const authUser = ref(fetchUser());

async function fetchUser() {
  try {
    const response = await axios.get("/auth/me");
    authUser.value = response.data;
  } catch (error) {
    console.log("An error has occured");
    console.error(error);
    authUser.value = {};
  }
  return authUser.value;
}

const { getUser } = useUsersStore();
const username = ref(null);

const { getPersonalAddresses } = useAddressesStore();
const addresses = ref([]);

const props = defineProps({
	machineSelected: {type: Object, required: true},
	// usersMachine: {type: Object, required: true},
	// addressMachine: {type: Object, required: true},
	// timeSlots: {type: Array, required: true}
})

// const getUsername = async () => {
//   try {
//     const user = await axios.get(`/users/${machineSelected.userId}`);
//     username.value = user.username;
//   } catch (error) {
//     console.error(error);
//   }
// };

const addressObj = computed(() => {
  if (addresses.value.length === 0) {
    return {};
  }
  return addresses.value.find((addr) => addr.id === props.machineSelected.addressId) || {};
});

const addressStr = computed(() => {
  const { streetL1, zip, city, country } = addressObj.value;
  return `${streetL1}, ${zip} ${city}, ${country}`;
});

const getAddresses = async () => {
  try {
    addresses.value = await getPersonalAddresses();
  } catch (error) {
    console.error(error);
  }
};

// getUsername();
getAddresses();


const active = ref(false);

const seeReservation = () => {
	active.value = true;
}

const closeModal = () => {
	active.value = false;
}

const disabled = computed(() => authUser.value.id === props.machineSelected.userId ? true : false)

</script>