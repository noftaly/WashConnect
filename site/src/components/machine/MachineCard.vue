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
            <small class="text-muted">Posted by : {{ username }}</small><br/>
            <small class="text-muted">Located at : {{ addressStr }}</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { defineProps } from "vue";

import { useUsersStore } from "../../stores/users";
import { useMachinesStore } from "../../stores/machines.js";
import { useAddressesStore } from "../../stores/addresses";
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
  userId: {
    type: Number,
    required: true,
  },
  addressId: {
    type: Number,
    required: true,
  },
});

const { getMachineById } = useMachinesStore();
const displayedMachine = ref(null);

const { getUser } = useUsersStore();
const username = ref(null);

const { getPersonalAddresses } = useAddressesStore();
const addresses = ref([]);

const getMachine = async () => {
  try {
    displayedMachine.value = await getMachineById(props.id);
  } catch (error) {
    console.error(error);
  }
};

const getUsername = async () => {
  try {
    const user = await getUser(props.userId);
    username.value = user.username;
  } catch (error) {
    console.error(error);
  }
};

const addressObj = computed(() => {
  if (addresses.value.length === 0) {
    return {};
  }
  return addresses.value.find((addr) => addr.id === props.addressId) || {};
});

const addressStr = computed(() => {
  const { streetL1, zip, city, country } = addressObj.value;
  return `${streetL1}, ${zip} ${city}, ${country}`;
});

const getAddresses = async () => {
  try {
    addresses.value = await getPersonalAddresses();
  } catch (error) {
    console.error(error);
  }
};

getMachine();
getUsername();
getAddresses();
</script>