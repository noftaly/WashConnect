<template>
  <header>
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
import { useCartStore } from "./stores/cart.js";
import { useMachinesStore } from "./stores/machines.js";

const { fetchMachines } = useMachinesStore();
const { fetchItems } = useCartStore();
const { isAuthenticated } = useAuth();

fetchMachines();
if (isAuthenticated) {
  fetchItems();
}
</script>
