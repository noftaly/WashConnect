<template>
  <header>
    <meta name="theme-color" content="#84B1F0">
    <LayoutNavbar />
  </header>

  <div class="mt-7">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import LayoutNavbar from "./components/LayoutNavbar.vue";

import { useAuth } from "./utils/useAuthHook.js";
import { useMachinesStore } from "./stores/machines.js";

const { fetchMachines } = useMachinesStore();
const { isAuthenticated } = useAuth();

if (isAuthenticated) {
  fetchMachines();
}
</script>
