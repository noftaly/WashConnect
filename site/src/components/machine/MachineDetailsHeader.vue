<template>
  <p class="fs-4">
    <PriceFormatted :price="price_wash_dry" />
  </p>
  <p>{{ description }}</p>
</template>

<script setup>
import PriceFormatted from "../formatters/PriceFormatted.vue";

defineProps({
  price_wash_dry: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
</script>
