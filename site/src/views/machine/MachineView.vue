<template>
    <main class="mx-3 my-5">
      <div v-if="machine" class="large-screen">
        <h1 class="text-center my-5">{{ machine.title }}</h1>
        <div class="row">
          <div class="col-5">
            <div class="d-flex flex-column">
              <img :src="machine.image" class="img-fluid" />
              <MachineDetailsCharacteristics :characteristic="machine.characteristic" />
            </div>
          </div>
          <div class="col-5">
            <MachineDetailsHeader :price="machine.price" :description="machine.description" />
            <hr />
            <h6>About this machine</h6>
            <p>{{ machine.description }}</p>
          </div>
          <div class="col-2">
            <div class="sticky">
              <machineDetailsPayment :id="machine.id" />
              <div v-if="isAdmin" class="mt-4">
                <!-- <RouterLink class="btn btn-outline-secondary w-100" :to="`/admin/machines/${id}`"
                  >Edit machine</RouterLink> -->
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div v-if="machine" class="small-screen">
        <h1 class="text-center my-5">{{ machine.title }}</h1>
  
        <img :src="machine.image" class="img-fluid" />
  
        <MachineDetailsHeader :price="machine.price_wash_dry" :description="machine.description" />
  
        <MachineDetailsPayment :id="machine.id" />
  
        <h5 class="mt-3">About this machine</h5>
        <p>{{ machine.description }}</p>
  
        <MachineDetailsCharacteristics :characteristic="machine.characteristic" />
  
        <!-- <div v-if="isAdmin" class="mt-4">
          <RouterLink class="btn btn-outline-secondary w-100" :to="`/admin/machines/${id}`">Edit machine</RouterLink>
        </div> -->
      </div>
    </main>
  </template>
  
  <script setup>
  import { storeToRefs } from "pinia";
  import { useRoute } from "vue-router";
  import MachineDetailsCharacteristics from "../../components/machine/MachineDetailsCharacteristics.vue";
  import MachineDetailsHeader from "../../components/machine/MachineDetailsHeader.vue";
  import MachineDetailsPayment from "../../components/machine/MachineDetailsPayment.vue";
  import { useAuthStore } from "../../stores/auth.js";
  import { useMachinesStore } from "../../stores/machines.js";
  
  const { isAdmin } = storeToRefs(useAuthStore());
  const { machine } = storeToRefs(useMachinesStore());
  const { clearMachine, fetchMachine } = useMachinesStore();
  
  clearMachine();
  
  const id = Number(useRoute().params.id);
  fetchMachine(id);
  </script>
  
  <style scoped>
  @media (max-width: 992px) {
    .sticky {
      position: static;
    }
  }
  
  .large-screen {
    display: none;
  }
  
  .small-screen {
    display: block;
  }
  
  @media (min-width: 992px) {
    .large-screen {
      display: block;
    }
  
    .small-screen {
      display: none;
    }
  }
  </style>
  