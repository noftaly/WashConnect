<template>
	<div class="card mb-3">
		<div class="row g-0">
			<div class="col-md-4">
				<img :src="machine.imgUrl.length > 0 ? machine.imgUrl : AdCover" class="img-fluid rounded-start h-100"
					style="object-fit: cover" alt="Machine" />
			</div>
			<div class="col-md-8">
				<div class="card-body">
					<h5 class="card-title">{{ machine.adTitle }}</h5>
					<p class="card-text">
						{{ machine.adDescription }}
					</p>
					<p class="card-text">
						{{ machineAddress.line1 }}, {{ machineAddress.zip }}, {{ machineAddress.city }}
					</p>
					<p class="card-text d-flex flex-row gap-3">
						<span>
							<small class="text-muted">
								<PriceFormatted :price="machine.priceWashingDrying" notation="compact" />
							</small>
						</span>
						<span v-if="!machine.hasWasher" class="text-danger">
							No Washer
							<span v-if="!machine.hasDryer" class="text-danger">No Dryer</span>
						</span>
						<span v-else class="text-success">Operational</span>
					</p>
					<button @click="seeReservation" type="button" class="btn btn-outline-primary w-50">
						I'm interested
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import AdCover from "../../assets/mocked_ad_img.jpg";
import PriceFormatted from "../formatters/PriceFormatted.vue";
import { computed } from "vue";

const router = useRouter();
const props = defineProps({
	machine: { type: Object, required: true},
	addresses: { type: Array, required: true}
})

const machineAddress = computed(() => props.addresses.find((value) => value.id === props.machine.addressId));

const seeReservation = () => {
	router.push(`/machines/${props.machine.id}`)
}
</script>
