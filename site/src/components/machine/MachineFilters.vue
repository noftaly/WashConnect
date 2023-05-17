<template>
  <div class="filter-card p-4">
    <div class="filter-sticky">
      <h4 class="text-center fw-bold mt-2">Filters</h4>

      <div class="my-4">
        <div class="d-flex justify-content-between align-items-baseline mb-2">
          <span>Price Range (€):</span>
        </div>

        <div class="d-flex justify-content-between align-items-baseline">
          <input
            type="number"
            class="form-control form-control-sm"
            placeholder="Min"
            v-model="priceRange[0]"
            @change="changePriceRange(priceRange)"
          />
          <input
            type="number"
            class="form-control form-control-sm"
            placeholder="Max"
            v-model="priceRange[1]"
            @chnage="changePriceRange(priceRange)"
          />
      </div>

      <br/>
      <div class="input-group mb-3">
        <select class="form-select" v-model="selectedType" @change="updateFiltersType(selectedType)">
          <option selected disabled value="">Machine Type</option>
					<option>Wash</option>
					<option>Dry</option>
					<option>Wash & Dry</option>
				</select>
			</div>

      <!-- <br/> -->
      <div class="d-flex justify-content-between align-items-baseline">
        <span>Min Capacity (L):</span>
        <input
            type="number"
            class="form-control form-control-sm"
            style="width: 240px;"
            placeholder="Min Capacity"
            v-model="minCapacity"
            @change="changeCapacity(minCapacity)"
          />
      </div>


      <div v-if="isAuthenticated">
        <hr/>
        <RouterLink v-if="isAuthenticated" :to="`/new_ad`" class="text-decoration-none">
          <button type="button" class="btn btn-outline-primary w-100">Add a new machine</button>
        </RouterLink>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import Slider from "@vueform/slider";
import axios from "../../utils/axios.js";

import "@vueform/slider/themes/default.css";
import priceFormatter from "../../utils/priceFormatter.js";
import PriceFormatted from "../formatters/PriceFormatted.vue";

import { useAuth } from "../../utils/useAuthHook.js";
import { useMachinesStore } from "../../stores/machines.js";

const { isAuthenticated } = storeToRefs(useAuth());
const priceRange = ref([1, 20]);
const selectedType = ref("");
const minCapacity = ref(10);

const { fetchMachines, machines, filters } = useMachinesStore();


function changePriceRange(priceRange) {
  filters.pgt = priceRange[0];
  filters.plt = priceRange[1];
  filterMachines();
}

function updateFiltersType(selectedType) {
  if (selectedType === "Wash") {
    filters.type = 0;
  } else if (selectedType === "Dry") {
    filters.type = 1;
  } else if (selectedType === "Wash & Dry") {
    filters.type = 2;
  } else {
    filters.type = 0;
  }
  filterMachines();
}

function changeCapacity(minCapacity) {
  filters.capacity = minCapacity;
  filterMachines();
}

async function filterMachines() {
   await axios.get("http://localhost:5050/machines", {
    params: {
      pgt: filters.pgt,
      plt: filters.plt,
      type: filters.type,
      capacity: filters.capacity
    }
  })
  .then((response) => {
    machines.value = response.data;
  })
  .catch((error) => {
    console.log(error);
  });
} 


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
