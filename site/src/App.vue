<template>
  <header>
    <LayoutNavbar />
  </header>

  <div class="mt-7">
    <RouterView/>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import LayoutNavbar from "./components/LayoutNavbar.vue";

import { useAuthStore } from "./stores/auth.js";
import { useCartStore } from "./stores/cart.js";
import { useMachinesStore } from "./stores/machines.js";

const { fetchMachines } = useMachinesStore();
const { fetchItems } = useCartStore();
const { isAuthenticated } = useAuthStore();

fetchMachines();
if (isAuthenticated) {
  fetchItems();
}
</script>
