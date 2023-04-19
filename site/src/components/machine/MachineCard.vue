<template>
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img :src="image" class="img-fluid rounded-start h-100" style="object-fit: cover" alt="Machine" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ title }}</h5>
            <p class="card-text">
              {{ description }}
            </p>
            <p class="card-text d-flex flex-row gap-3">
              <span>
                <small class="text-muted"><PriceFormatted :price="price_wash_dry" notation="compact" /></small>
              </span>
              <span v-if="!hasWasher" class="text-danger">
                No Washer
                <span v-if="!hasDryer" class="text-danger">No Dryer</span>
              </span>
              <span v-else class="text-success">Operational</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import PriceFormatted from "../formatters/PriceFormatted.vue";
  
  defineProps({
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    hasWasher: {
      type: Boolean,
      required: true,
    },
    hasDryer: {
      type: Boolean,
      required: true,
    },
    price_wash_dry: {
      type: Number,
      required: true,
    },
  });
  </script>
  