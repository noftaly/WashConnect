<template>
  <nav class="navbar navbar-blue navbar-expand-lg fixed-top navbarScroll">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">
        <img src="../assets/Logo_WashConnect.png" height="45" />
      </RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsable">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse justify-content-between" id="collapsable">
        <span style="font-size: 1rem" class="mt-1">Wash Connect - Share your washing machine to your neighbors!</span>
        <div class="d-flex flex-column flex-lg-row gap-3 align-items-center me-1">
          <div class="d-flex">
            <input
              class="form-control rounded-pill border-0 shadow-sm py-1"
              type="search"
              placeholder="Search"
              v-model="searchQuery"
              @keyup.enter="search"
            />
          </div>

          <!-- We run this section if the user is logged in -->
          <div v-if="isAuthenticated" class="navbar-nav d-flex flex-row gap-1">
            <!-- We display the user -->
            <li>
              <RouterLink class="nav-link p-1" to="/profile">
                <div class="d-flex flex-column">
                  <font-awesome-icon icon="fa-solid fa-user" size="xl" />
                  <span style="font-size: 0.7rem" class="text-center mt-1">{{ user.username }}</span>
                </div>
              </RouterLink>
            </li>

            <!-- We display the balance-->
            <li>
              <RouterLink class="nav-link p-1" to="/profile">
                <div class="d-flex flex-column">
                  <font-awesome-icon icon="fa-solid fa-wallet" size="xl" />
                  <span style="font-size: 0.7rem" class="text-center mt-1">Balance: {{ user.balance }}€</span>
                </div>
              </RouterLink>
            </li>

            <li>
              <RouterLink class="nav-link p-1" to="/history">
                <div class="d-flex flex-column">
                  <font-awesome-icon icon="fa-solid fa-calendar-check" size="xl" />
                  <span style="font-size: 0.7rem" class="text-center mt-1">History</span>
                </div>
              </RouterLink>
            </li>

            <li class="nav-item">
              <div class="nav-link cursor-pointer p-1" @click.prevent="doLogout">
                <div class="d-flex flex-column">
                  <font-awesome-icon icon="fa-solid fa-right-from-bracket" size="xl" />
                  <span style="font-size: 0.7rem" class="text-center mt-1">Logout</span>
                </div>
              </div>
            </li>
          </div>

          <!-- We run this section if the user is NOT logged in -->
          <div v-else class="navbar-nav d-flex flex-row gap-3">
            <li class="nav-item">
              <RouterLink class="nav-link" to="/register">
                <font-awesome-icon icon="fa-solid fa-user" /> Register
              </RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/login">
                <font-awesome-icon icon="fa-solid fa-right-to-bracket" /> Login
              </RouterLink>
            </li>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import router from "../router";

import { useAuth } from "../utils/useAuthHook.js";
import { useMachinesStore } from "../stores/machines.js";

const { isAuthenticated, user } = storeToRefs(useAuth());
const { logout } = useAuth();
const { searchMachines } = useMachinesStore();

const searchQuery = ref("");

async function doLogout() {
  await logout();
  router.push({ name: "login" });
}

async function search() {
  searchMachines(searchQuery.value);
  router.push({ name: "search", force: true });
}
</script>

<style scoped>
.fa-2x5 {
  transform: scale(0.6);
}
.navbar-blue {
  background-color: rgb(132, 177, 240);
}

.nav-link:not(.discreet) {
  transition: all 0.2s ease-in-out;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
}

.nav-link:hover:not(.discreet) {
  background-color: #00000013;
  border-radius: 0.5rem;
}
</style>
