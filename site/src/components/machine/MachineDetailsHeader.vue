<template>
  <p class="fs-4">
    <PriceFormatted :price="price" />
  </p>
  <p>{{ description }}</p>
  <p class="text-muted">Located at {{ stringifyAddress(addressId) }}</p>
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

defineProps({
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

async function stringifyAddress(addressId) {
  addresses.value = await getPersonalAddresses();
  address.value = addresses.value.find((address) => address.id === addressId);
  // console.log(address.streetL1);
  return address.value.streetL1 + ", " + address.value.zip + " " + address.value.city + ", " + address.value.country;
}
</script>
