<template>
  <div>
    <RouterView/>
  </div>
</template>

<script setup>
import {RouterView}  from "vue-router";
import { useAuthStore } from "./stores/auth";
const { isAuthenticated } = useAuthStore();
</script>
