<template>
  <div class="inner cover d-flex flex-column align-items-center justify-content-center gap-4 pt-4 mx-4">
    <h1 class="cover-heading">No upcoming appointments here</h1>
    <p class="lead text-center">
      It seems that you have not yet reserved a washing machine. Click on the button below to access the available
      washing machines and to reserve one.
    </p>
    <button @click="goToOffers" type="button" class="btn btn-outline-primary w-50">See Offers</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToOffers = () => {
  router.push("/");
};
</script>
