<template>
  <p class="fs-4">
    <PriceFormatted :price="props.price" />
  </p>
  <p>{{ props.description }}</p>
  <p class="text-muted">Located at {{ addressStr }}</p>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAddressesStore } from "../../stores/addresses";
import PriceFormatted from "../formatters/PriceFormatted.vue";

const { getPersonalAddresses } = useAddressesStore();
const addresses = ref([]);

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

const address = computed(() =>
  addresses.value.find((addr) => addr.id === props.addressId)
);
const addressStr = computed(() => {
  const { streetL1, zip, city, country } = address.value;
  return `${streetL1}, ${zip} ${city}, ${country}`;
});


async function getAddresses() {
  try {
    addresses.value = await getPersonalAddresses();
  } catch (error) {
    console.error(error);
  }
}

getAddresses();
</script>
