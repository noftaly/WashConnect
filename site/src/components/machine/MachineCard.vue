<template>
  <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-4">
        <img
          src="../../assets/mocked_ad_img.jpg"
          class="img-fluid rounded-start h-100"
          style="object-fit: cover"
          alt="Machine"
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-adTitle">{{ props.adTitle }}</h5>
          <p class="card-text">
            {{ props.adDescription }}
          </p>

          <p class="card-text d-flex flex-row gap-3">
            <span>
              <small class="text-muted"><PriceFormatted :price="priceWashingDrying" notation="compact" /></small>
            </span>
            <span v-if="props.hasWasher == false" class="text-danger">
              No Washer
              <span v-if="props.hasDryer == false" class="text-danger">No Dryer</span>
            </span>
            <span v-else class="text-success">Operational</span>
          </p>

          <p class="card-text">
            <small class="text-muted">Located at : {{ stringifyAddress(props.addressId) }}</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { defineProps } from "vue";
import axios from "../../utils/axios.js";

import { useMachinesStore } from "../../stores/machines.js";
import { useAddressesStore } from "../../stores/addresses";
import PriceFormatted from "../formatters/PriceFormatted.vue";

const { getMachineById } = useMachinesStore();
const displayedMachine = ref(getMachineById(props.id));

const { getPersonalAddresses } = useAddressesStore();
const addresses = ref(getPersonalAddresses());
const address = ref(null);

// async function getPersonalAddresses() {
//   try {
//     const response = await axios.get("http://localhost:5050/addresses");
//     addresses.value = response.data;
//   } catch (error) {
//       console.log("An error has occured");
//       console.error(error);
//       addresses.value = [];
//   }
//   return addresses.value;
// }

async function stringifyAddress(addressId) {
  addresses.value = await getPersonalAddresses();
  address.value = addresses.value.find((address) => address.id === addressId);
  // console.log(address.streetL1);
  return address.value.streetL1 + ", " + address.value.zip + " " + address.value.city + ", " + address.value.country;
}

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  adTitle: {
    type: String,
    required: true,
  },
  adDescription: {
    type: String,
    required: true,
  },
  hasWasher: {
    type: Boolean,
    required: true,
  },
  hasDryer: {
    type: Boolean,
    required: true,
  },
  priceWashingDrying: {
    type: Number,
    required: true,
  },
  addressId: {
    type: Number,
    required: true,
  },
});
</script>
