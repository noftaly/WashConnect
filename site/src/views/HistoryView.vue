<!-- Page pour consulter l'historique des annonces réservées -->
<template>
  <div>
    <ListHistory />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import router from "../router/index.js";
import { useAuth } from "../utils/useAuthHook.js";
import ListHistory from "../components/history/ListHistory.vue";

const { isAuthenticated } = storeToRefs(useAuth());
if (!isAuthenticated.value) {
  router.push({ name: "login" });
}
</script>
