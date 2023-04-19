<template>
    <div class="filter-card p-4">
      <div class="filter-sticky">
        <h4 class="text-center fw-bold">Filters</h4>
  
        <div class="my-4">
          <div class="d-flex justify-content-between align-items-baseline mb-2">
            <span>Price</span>
            <span class="text-muted small"
              >From <PriceFormatted :price="priceRange[0]" notation="compact" /> to
              <PriceFormatted :price="priceRange[1]" notation="compact"
            /></span>
          </div>
          <Slider
            :min="1"
            :max="100"
            :step="1"
            :format="(value) => priceFormatter.format(value)"
            :tooltips="false"
            v-model="priceRange"
            @change="(value) => $emit('change:price', value)"
          />
        </div>
  
        <div class="my-4">
          <div class="d-flex justify-content-between align-items-baseline mb-2">Manufacturer</div>
          <div v-for="manufacturer in Object.keys(manufacturers)" :key="manufacturer">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="manufacturers[manufacturer]"
                :id="`enable-manufacturer-${manufacturer}`"
                @change="$emit('change:manufacturer', manufacturers)"
              />
              <label class="form-check-label" :for="`enable-manufacturer-${manufacturer}`">
                {{ manufacturer }}
              </label>
            </div>
          </div>
        </div>
  
        <div class="my-4">
          <div class="d-flex justify-content-between align-items-baseline mb-2">Category</div>
          <div v-for="category in Object.keys(categories)" :key="category">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="categories[category]"
                :id="`enable-category-${category}`"
                @change="$emit('change:category', categories)"
              />
              <label class="form-check-label" :for="`enable-category-${category}`">
                {{ category }}
              </label>
            </div>
          </div>
        </div>
        <!-- <RouterLink :to="`/admin/machines/new`" class="text-decoration-none">
          <button v-if="isAdmin" type="button" class="btn btn-outline-primary w-100">Add a new machine</button>
        </RouterLink> -->
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  import { storeToRefs } from "pinia";
  import Slider from "@vueform/slider";
  import "@vueform/slider/themes/default.css";
  import priceFormatter from "../../utils/priceFormatter.js";
  import PriceFormatted from "../formatters/PriceFormatted.vue";
  import { useAuthStore } from "../../stores/auth.js";
  import { useMachinesStore } from "../../stores/machines.js";
  import capitalize from "../../utils/capitalize";
  
//   const { isAdmin } = storeToRefs(useAuthStore());
  
  const priceRange = ref([0, 100]);
  
  const { machines } = storeToRefs(useMachinesStore());
  
  const emitChangedCategory = defineEmits(["change:category"]);
  
  const props = defineProps({
    category: {
      type: String,
      required: false,
    },
  });
  
  const manufacturers = ref({});
  const categories = ref({});

  watch(machines, () => {
    manufacturers.value = Object.fromEntries(
      machines.value.map((machine) => [machine.characteristic.manufacturer, true])
    );
    categories.value = Object.fromEntries(
      machines.value.map((machine) => [capitalize(machine.characteristic.category), true])
    );
  
    if (props.category) {
      categories.value = Object.fromEntries(
        machines.value.map((machine) => [capitalize(machine.characteristic.category), false])
      );
      categories.value[capitalize(props.category)] = true;
      emitChangedCategory("change:category", categories.value);
    }
  });
  </script>
  
  <style scoped>
  .bg-grey {
    background-color: #f5f5f5;
  }
  
  .small {
    font-size: 0.8rem;
  }
  
  * {
    --slider-connect-bg: #0d6efd;
  }
  
  @media (min-width: 768px) {
    .filter-card {
      height: 100vh;
    }
  
    .filter-sticky {
      position: sticky;
      top: 5rem;
      z-index: 1000;
      height: 25vh;
    }
  }
  </style>
  