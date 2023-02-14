<template>
  {{ formatter.format(price) }}
</template>

<script setup>
import { ref, watchEffect } from "vue";

const props = defineProps({
  price: {
    type: Number,
    required: true,
  },
  notation: {
    type: String,
    validator: (value) => ["compact", "standard", "scientific", "engineering"].includes(value),
  },
});

const formatter = new Intl.NumberFormat("ca-CA", {
  style: "currency",
  currency: "CAD",
  notation: props.notation ?? "standard",
});

const price = ref(0);
watchEffect(() => (price.value = props.price));
</script>
