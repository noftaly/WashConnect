<template>
    <main>
      <div class="row">
        <div class="col-md-3">
          <div class="mx-3 ms-md-3">
            <MachineFilters
              :category="props.category"
              @change:price="updatedPrices"
              @change:manufacturer="updatedManufacturer"
              @change:category="updatedCategory"
            />
          </div>
        </div>
        <div class="col-md-9">
          <div class="mx-4 me-md-5">
            <div v-for="item in shownItems" :key="item.id">
              <RouterLink :to="`/machines/${item.id}`" class="text-decoration-none">
                <MachineCard v-bind="item" />
              </RouterLink>
            </div>
            <div v-if="shownItems.length === 0">
              <h5 class="text-center mt-6 my-auto">No machines matching your filters was found</h5>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <script setup>
  import { storeToRefs } from "pinia";
  import { ref, watch } from "vue";
  import { useMachinesStore } from "../../stores/machines.js";
  import MachineFilters from "./MachineFilters.vue";
  import MachineCard from "./MachineCard.vue";
  import data from "../../utils/mocked_data.js"
  
  const { machines } = storeToRefs(useMachinesStore());
  const { fetchMachines } = useMachinesStore();
  
  fetchMachines();
  
  const props = defineProps(["category"]);
  
  const shownItems = ref(data);
  
  watch(machines, () => {
    shownItems.value = [...machines.value];
  });
  
  const pricePredicate = (priceRange) => (item) => item.price >= priceRange[0] && item.price <= priceRange[1];
  const manufacturerPredicate = (manufacturers) => (item) => manufacturers[item.characteristic.manufacturer];
  const categoryPredicate = (categories) => (item) => categories[item.characteristic.category];
  
  const predicates = {
    price: null,
    manufacturer: null,
    category: null,
  };
  
  function updatedPrices(priceRange) {
    predicates.price = pricePredicate(priceRange);
    filterItems();
  }
  
  function updatedManufacturer(manufacturers) {
    predicates.manufacturer = manufacturerPredicate(manufacturers);
    filterItems();
  }
  
  function updatedCategory(categories) {
    const categoriesLowerCase = Object.keys(categories).reduce((acc, key) => {
      acc[key.toLowerCase()] = categories[key];
      return acc;
    }, {});
    console.log(categoriesLowerCase);
    predicates.category = categoryPredicate(categoriesLowerCase);
    filterItems();
  }
  
  function filterItems() {
    const predicate = Object.values(predicates)
      .filter((predicate) => predicate !== null)
      .reduce(
        (acc, predicate) => (item) => acc(item) && predicate(item),
        () => true
      );
  
    shownItems.value = machines.value.filter(predicate);
  }
  </script>
  
  <style scoped>
  a {
    color: inherit;
  }
  </style>
  