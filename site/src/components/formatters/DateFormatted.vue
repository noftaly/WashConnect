<template>
  <span>
    {{ date.toLocaleDateString("fr-FR") }}
    at
    {{ date.getHours().toString().padStart(2, "0") }}h{{ date.getMinutes().toString().padStart(2, "0") }}
  </span>
</template>

<script setup>
defineProps({
  date: {
    type: Date,
    required: true,
  },
});
</script>
