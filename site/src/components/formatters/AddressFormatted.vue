<template>
  {{ street }}
  <br />
  {{ city }}, {{ zipCode }}
  <br />
  {{ country }}
</template>

<script setup>
defineProps({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});
</script>
