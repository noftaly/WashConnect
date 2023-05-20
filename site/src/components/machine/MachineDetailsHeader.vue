<template>
  <div class="text-wrap">
    <p class="fs-4">{{ props.description }}</p>
    <p class="text-muted">Posted by {{ props.user.username }}</p>
    <p class="text-muted">Located at {{ addressStr }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  description: {
    type: String,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
});

const addressStr = computed(() => {
  const { line1, zip, city, country } = props.address;
  return `${line1}, ${zip} ${city}, ${country}`;
});
</script>
