<template>
  <div class="card-body">
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img :src="AdCover" class="img-fluid rounded-start h-100" style="object-fit: cover" alt="Machine" />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 v-if="historyMachine.machineType === 'WASHING_MACHINE'" class="card-title">
              <span> <SvgWash /> </span>{{ dayAppointment.toDateString() }} at {{ hourAppointment }}:{{
                minuteAppointment
              }}
            </h5>
            <h5 v-else class="card-title">
              <span> <SvgDry /> </span>{{ dayAppointment.toDateString() }} at {{ hourAppointment }}:{{
                minuteAppointment
              }}
            </h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">{{ machineAppointment.adTitle }}</h6>
            <p class="card-text">
              {{ machineAppointment.adDescription }}
            </p>
            <ul class="list-group">
              <li class="list-group-item d-flex align-items-center gap-2">
                <span class="d-flex">
                  <span>
                    <SvgEuro />
                  </span>
                </span>
                <span v-if="historyMachine.machineType === 'WASHING_MACHINE'">
                  {{ machineAppointment.priceWashing }}
                </span>
                <span v-else>
                  {{ machineAppointment.priceDrying }}
                </span>
              </li>
              <li
                class="list-group-item d-flex align-items-center gap-2"
                v-if="machineAppointment.detergentIncluded && historyMachine.machineType === 'WASHING_MACHINE'"
              >
                <span class="d-flex">
                  <SvgDetergent />
                </span>
                included
              </li>
              <li
                class="list-group-item d-flex align-items-center gap-2"
                v-else-if="!machineAppointment.detergentIncluded && historyMachine.machineType === 'WASHING_MACHINE'"
              >
                <span>
                  <SvgDetergent />
                </span>
                not included
              </li>
              <li class="list-group-item d-flex align-items-center gap-2">
                <span>
                  <SvgTime />
                </span>
                {{ machineAppointment.washDuration }} min
              </li>
              <li class="list-group-item d-flex align-items-center gap-2">
                <span>
                  <SvgWeightLaundry />
                </span>
                {{ machineAppointment.maxCapacity }} kg
              </li>
              <li class="list-group-item d-flex align-items-center gap-2">
                <span>
                  <SvgLocation />
                </span>
                {{ machineAddressStr }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AdCover from "../../assets/mocked_ad_img.jpg";
import SvgWash from "../../svg/SvgWash.vue";
import SvgDry from "../../svg/SvgDry.vue";
import SvgEuro from "../../svg/SvgEuro.vue";
import SvgDetergent from "../../svg/SvgDetergent.vue";
import SvgTime from "../../svg/SvgTime.vue";
import SvgWeightLaundry from "../../svg/SvgWeightLaundry.vue";
import SvgLocation from "../../svg/SvgLocation.vue";

import { ref, computed } from "vue";
import { useAddressesStore } from "../../stores/addresses";

const props = defineProps({
  history: { type: Object, required: true },
});

const { getPersonalAddresses } = useAddressesStore();
const addresses = ref([]);
const historyMachine = computed(() => props.history);

const dayAppointment = computed(() => new Date(historyMachine.value.timeSlot));
const hourAppointment = computed(() => dayAppointment.value.getHours());
const minuteAppointment = computed(() => dayAppointment.value.getMinutes());

const machineAppointment = computed(() => historyMachine.value.machine);

const addressObj = computed(() => {
  if (addresses.value.length === 0) {
    return {};
  }
  return addresses.value.find((addr) => addr.id === machineAppointment.value.addressId) || {};
});

const machineAddressStr = computed(() => {
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

getAddresses();
</script>
