<template>
  <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-4">
        <img
          src="../../assets/mocked_ad_img.jpg"
          class="img-fluid rounded-start h-100"
          style="object-fit: cover"
          alt="Machine"
        />
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-adTitle">{{ props.adTitle }}</h5>
          <p class="card-text">
            {{ props.adDescription }}
          </p>

          <p class="card-text d-flex flex-row gap-3">
            <span>
              <small class="text-muted"><PriceFormatted :price="priceWashingDrying" notation="compact" /></small>
            </span>
            <span v-if="props.hasWasher == false" class="text-danger">
              No Washer
              <span v-if="props.hasDryer == false" class="text-danger">No Dryer</span>
            </span>
            <span v-else class="text-success">Operational</span>
          </p>

          <p class="card-text">
            <small class="text-muted">Posted by : {{ props.user.username }}</small
            ><br />
            <small class="text-muted">Located at : {{ addressStr }}</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import PriceFormatted from "../formatters/PriceFormatted.vue";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  adTitle: {
    type: String,
    required: true,
  },
  adDescription: {
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
  priceWashingDrying: {
    type: Number,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
});

const addressStr = computed(() => {
  const { line1, zip, city, country } = props.address;
  return `${line1}, ${zip} ${city}, ${country}`;
});
</script>
