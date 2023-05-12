<template>
  <p class="fs-4">
    <PriceFormatted :price="props.price" />
  </p>
  <p>{{ props.description }}</p>
  <p class="text-muted">Located at {{ props.address }}</p>
</template>

<script setup>
import { ref } from "vue";
import { defineProps } from "vue";
import axios from "../../utils/axios.js";

import { useAddressesStore } from "../../stores/addresses";
import PriceFormatted from "../formatters/PriceFormatted.vue";

const { getPersonalAddresses } = useAddressesStore();
const addresses = ref(getPersonalAddresses());
const address = ref(null);

const props = defineProps({
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  addressId: {
    type: Number,
    required: true,
  },
});

console.log("proprs: ", props)

// function stringifyAddress(addressId) {
//   // addresses.value = await getPersonalAddresses();
//   // console.log('addressId', addressId);
//   address.value = addresses.value.find((address) => address.id === addressId);
//   // console.log(address.streetL1);
//   return address.value.streetL1 + ", " + address.value.zip + " " + address.value.city + ", " + address.value.country;
// }

// stringifyAddress(props.addressId);
</script>
