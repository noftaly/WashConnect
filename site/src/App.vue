<template>
  <header>Bonjour</header>

  <button type="button" class="btn btn-primary">Primary</button>

  <div class="mt-7">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>
