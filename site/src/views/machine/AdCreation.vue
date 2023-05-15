<template>
  <main class="container my-5">
    <div class="d-flex justify-content-center">
      <img class="mt-5" style="width: 25%" src="../../assets/Logo_WashConnect.png" />
    </div>
    <h1 class="text-center mt-5">Creating new ad</h1>

    <div class="row d-flex justify-content-center">
      <div class="col-md-6">
        <div class="px-5 py-5">
          <div class="form-data" v-if="!submitted">
            <div class="row">
              <!-- title -->
              <div class="forms-inputs mb-4">
                <span>Ad's Title</span>
                <input
                  autocomplete="off"
                  type="text"
                  v-model="title"
                  :class="{ 'form-control': true, 'is-invalid': !validTitle(title) && titleBlured }"
                  @blur="titleBlured = true"
                  @keyup.enter="submit"
                />
                <div class="invalid-feedback">A valid title is required!</div>
              </div>

              <!-- Description -->
              <div class="forms-inputs mb-4 from-group">
                <label for="description"><span class="font-weight-bold">Description</span></label>
                <textarea
                  autocomplete="off"
                  type="text"
                  v-model="description"
                  :class="{
                    'form-control': true,
                    'is-invalid': !validDescription(description) && descriptionBlured,
                  }"
                  @blur="descriptionBlured = true"
                  @keyup.enter="submit"
                />
                <div class="invalid-feedback">A valid description is required!</div>
              </div>
            </div>

            <hr/>

            <!-- Machines Check boxes -->
            <div class="forms-check mb-4">
              <span>Which type of machine do you have ?</span><br/>
              <input
                class="form-check-input"
                type="checkbox"
                v-model="hasWasher"
                v-on:click="toggleBoolean(hasWasher)"
                style="transform: scale(1.25)"
              />
              <label class="form-check-label" for="hasWasher"> Washer ? </label>

              <input
                class="form-check-input"
                type="checkbox"
                v-model="hasDryer"
                v-on:click="toggleBoolean(hasDryer)"
                style="transform: scale(1.25)"
              />
              <label class="form-check-label" for="hasDryer"> Dryer ? </label>

              <div class="invalid-feedback" v-if="hasWasher == false && hasDryer == false">
                Please select at least one machine
              </div>
            </div>

            <!-- WASHER INFOS -->
            <div v-if="hasWasher">
              <div class="forms-inputs mb-4">
                <span>Washing Price</span>
                <input
                  autocomplete="off"
                  type="number"
                  v-model="priceWashing"
                  :class="{ 'form-control': true, 'is-invalid': !validPrice(priceWashing) && priceWashingBlured }"
                  @blur="priceWashingBlured = true"
                  @keyup.enter="submit"
                />
                <div class="invalid-feedback">A valid washing price is required!</div>
              </div>

              <div class="forms-inputs mb-4">
                <span>Washing Duration (in minutes)</span>
                <input
                  autocomplete="off"
                  type="number"
                  v-model="cycle_wash_duration"
                  :class="{
                    'form-control': true,
                    'is-invalid': !validDuration(cycle_wash_duration) && cycle_wash_duration_blured,
                  }"
                  @blur="cycle_wash_duration_blured = true"
                  @keyup.enter="submit"
                />
                <div class="invalid-feedback">A valid washing duration is required!</div>
              </div>
            </div>

            <!-- DRYER INFOS -->
            <div v-if="hasDryer">
              <div class="forms-inputs mb-4">
                <span>Drying Price</span>
                <input
                  autocomplete="off"
                  type="number"
                  v-model="priceDrying"
                  :class="{ 'form-control': true, 'is-invalid': !validPrice(priceDrying) && priceDryingBlured }"
                  @blur="priceDryingBlured = true"
                  @keyup.enter="submit"
                />
                <div class="invalid-feedback">A valid drying price is required!</div>
              </div>

              <div class="forms-inputs mb-4">
                <span>Drying Duration (in minutes)</span>
                <input
                  autocomplete="off"
                  type="number"
                  v-model="cycle_dry_duration"
                  :class="{
                    'form-control': true,
                    'is-invalid': !validDuration(cycle_dry_duration) && cycle_dry_duration_blured,
                  }"
                  @blur="cycle_dry_duration_blured = true"
                  @keyup.enter="submit"
                />
                <div class="invalid-feedback">A valid drying duration is required!</div>
              </div>
            </div>

            <!-- MAX CAPACITY -->
            <div class="forms-inputs mb-4" v-if="hasWasher || hasDryer">
              <span>Max capacity (in Liters)</span>
              <input
                autocomplete="off"
                type="number"
                v-model="max_capacity"
                :class="{ 'form-control': true, 'is-invalid': !validCapacity(max_capacity) && max_capacity_blured }"
                @blur="max_capacity_blured = true"
                @keyup.enter="submit"
              />
              <div class="invalid-feedback">A valid max capacity is required!</div>
            </div>

            <div class="forms-check mb-4">
              <input
                class="form-check-input"
                type="checkbox"
                v-model="detergentIncluded"
                v-on:click="toggleBoolean(detergentIncluded)"
                style="transform: scale(1.25)"
              />
              <label class="form-check-label" for="detergentIncluded"> Is the detergent included ? </label>
            </div>

            <hr/>
            <!-- Address Selection -->
            <div>
              <span class="mx-2">Select your address: </span>
              <button
                class="btn btn-primary dropright dropdown-toggle mb-4"
                type="button"
                id="addressDropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{ selectedAddress || "Address" }}
              </button>
              <div class="dropdown-menu" aria-labelledby="addressDropdown" style="max-height: 110px; overflow-y: auto">
                <a
                  class="dropdown-item"
                  v-for="address in addresses"
                  :key="address.id"
                  @click="stringifyAddress(address)"
                >
                  {{ "Address " + address.id }}
                </a>
              </div>
              <div class="invalid-feedback">Please select an address</div>

              <!-- Address Creation -->
              <div class="forms-check mb-4">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="createAddress"
                  v-on:click="toggleBoolean(createAddress)"
                  style="transform: scale(1.25)"
                />
                <label class="form-check-label" for="createAddress"> Or create a new address </label>
              </div>

              <div v-if="createAddress">
                <div class="row">
                  <div class="col-md-6 forms-inputs mb-4">
                    <span>Address</span>
                    <input
                      autocomplete="off"
                      type="text"
                      v-model="streetL1"
                      :class="{ 'form-control': true, 'is-invalid': !validStreet(streetL1) && streetL1Blured }"
                      @blur="streetL1Blured = true"
                      @keyup.enter="submit"
                    />
                    <div class="invalid-feedback">A valid address is required!</div>
                  </div>

                  <div class="col-md-4 forms-inputs mb-4">
                    <span>Zip Code</span>
                    <input
                      autocomplete="off"
                      type="text"
                      v-model="zip"
                      :class="{ 'form-control': true, 'is-invalid': !validZip(zip) && zipBlured }"
                      @blur="zipBlured = true"
                      @keyup.enter="submit"
                    />
                    <div class="invalid-feedback">A valid zip code is required!</div>
                  </div>

                  <div class="col-md-4 forms-inputs mb-4">
                    <span>City</span>
                    <input
                      autocomplete="off"
                      type="text"
                      v-model="city"
                      :class="{ 'form-control': true, 'is-invalid': !validCity(city) && cityBlured }"
                      @blur="cityBlured = true"
                      @keyup.enter="submit"
                    />
                    <div class="invalid-feedback">A valid city is required!</div>
                  </div>

                  <div class="forms-inputs mb-4">
                    <span>Country</span>
                    <input
                      autocomplete="off"
                      type="text"
                      v-model="country"
                      :class="{ 'form-control': true, 'is-invalid': !validCountry(country) && countryBlured }"
                      @blur="countryBlured = true"
                      @keyup.enter="submit"
                    />
                    <div class="invalid-feedback">A valid country is required!</div>
                  </div>
                </div>
              </div>

              <hr/>
              <!-- Time Slot Selector -->
              <div class="forms-inputs mb-4">
                <label for="time-slot" class="font-weight-bold mb-2">Choose a time slot:</label>
                <div style="display: flex; flex-direction: column;">
                  <time-slot-selector id="time-slot" @update="handleDateTimeUpdate" />
                </div>
                <small class="form-text text-muted">Select a first time slot of availability for your machine.</small>
                <div class="invalid-feedback">A valid date/time, in the future, is required!</div>
              </div>


              <!-- Image URL -->
              <!-- <br />
              <div class="forms-inputs mb-4">
                <span>Ad's Illustration</span>
                <input
                  autocomplete="off"
                  type="text"
                  v-model="imageUrl"
                  :class="{ 'form-control': true, 'is-invalid': !validimageUrl(imageUrl) && imageUrlBlured }"
                  @blur="imageUrlBlured = true"
                  @keyup.enter="submit"
                />
                <div class="invalid-feedback">A valid illustration is required!</div>
              </div> -->

              <div class="mb-3">
                <button :disabled="!validate()" @click.prevent="submit" class="btn btn-dark w-100" style="font-size: 20px;">Post the ad</button>
                <span class="text-muted">Please make sure to fill up all the informations before posting yout ad?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import router from "../../router/index.js";
import axios from "../../utils/axios.js";

import timeSlotSelector from "../../components/machine/timeSlotSelector.vue";

import { useAuth } from "../../utils/useAuthHook.js";
import { useMachinesStore } from "../../stores/machines.js";
import { useAddressesStore } from "../../stores/addresses.js";
import { useTimeSlotsStore } from "../../stores/timeslots.js";

const { isAuthenticated } = storeToRefs(useAuth());
const { createMachine } = useMachinesStore();
const { createPersonalAddress } = useAddressesStore();
const { createTimeSlot } = useTimeSlotsStore();

if (!isAuthenticated.value) {
  router.push({ title: "login" });
}


const title = ref("");
const titleBlured = ref(false);
const description = ref("");
const descriptionBlured = ref(false);

const hasWasher = ref(false);
const hasDryer = ref(false);
const detergentIncluded = ref(false);
const machineType = ref("");

const cycle_wash_duration = ref(1);
const cycle_wash_duration_blured = ref(false);
const cycle_dry_duration = ref(1);
const cycle_dry_duration_blured = ref(false);
const max_capacity = ref(1);
const max_capacity_blured = ref(false);

const priceWashing = ref(1);
const priceWashingBlured = ref(false);
const priceDrying = ref(1);
const priceDryingBlured = ref(false);
const priceWashingDrying = ref(1);

const createAddress = ref(false);
const selectedAddress = ref("");
const adAddress = ref(null);
const addresses = ref(getPersonalAddresses());

const streetL1 = ref("");
const streetL1Blured = ref(false);
const zip = ref(0);
const zipBlured = ref(false);
const city = ref("");
const cityBlured = ref(false);
const country = ref("");
const countryBlured = ref(false);

const firstTimeSlot = ref(new Date());
const firstTimeSlotBlured = ref(false);

// const imageUrl = ref("");
// const imageUrlBlured = ref(false);

const valid = ref(false);
const validAddress = ref(false);
const submitted = ref(false);



function toggleBoolean(value) {
  return !value;
}

function validTitle(title) {
  return title.length > 0;
}

function validDescription(description) {
  return description.length > 0;
}

function validPrice(price) {
  return price > 0;
}

function calcTotalPrice() {
  if (hasWasher.value == true) {
    priceWashingDrying.value = priceWashing.value;
  }
  if (hasDryer.value == true) {
    priceWashingDrying.value = priceDrying.value;
  }
  if (hasWasher.value == true && hasDryer.value == true) {
    priceWashingDrying.value = priceWashing.value + priceDrying.value;
  }
  return priceWashingDrying.value;
}

function validDuration(duration) {
  return duration > 0;
}

function validCapacity(capacity) {
  return capacity > 0;
}



async function getPersonalAddresses() {
  try {
    const response = await axios.get("http://localhost:5050/addresses");
    addresses.value = response.data;
  } catch (error) {
    console.log("An error has occured");
    console.error(error);
    addresses.value = [];
  }
  return addresses.value;
}

function stringifyAddress(address) {
  selectedAddress.value = address.streetL1 + ", " + address.zip + " " + address.city + ", " + address.country;
}

function selectAddress(selectedAddress) {
  adAddress.value = addresses.value.find(
    (address) =>
      address.streetL1 + ", " + address.zip + " " + address.city + ", " + address.country == selectedAddress.value
  );
  return adAddress.value;
}

function validStreet(streetL1) {
  return streetL1.length > 0;
}

function validZip(zip) {
  return zip > 0 && zip < 100000;
}

function validCity(city) {
  return city.length > 0;
}

function validCountry(country) {
  return country.length > 0;
}


function handleDateTimeUpdate(dateTime) {
    firstTimeSlot.value = dateTime;
}

function validDateTime(dateTime) {
  // check if date is in the future
  const now = new Date();
  if (dateTime == null && dateTime < now) {
    return false;
  }

  return true;
}

// function validimageUrl(imageUrl) {
//   return imageUrl.length > 0;
// }


function validateAddress() {
  if (createAddress.value == false) {
    if (selectedAddress.value != "") {
      validAddress.value = true;
    }
  } else if (createAddress.value == true) {
    if (validStreet(streetL1.value) && validZip(zip.value) && validCity(city.value) && validCountry(country.value)) {
      validAddress.value = true;
    }
  }
  else {
    validAddress.value = false;
  }
}


function validate() {
  titleBlured.value = true;
  descriptionBlured.value = true;

  priceWashingBlured.value = true;
  priceDryingBlured.value = true;
  cycle_wash_duration_blured.value = true;
  cycle_dry_duration_blured.value = true;
  max_capacity_blured.value = true;

  streetL1Blured.value = true;
  zipBlured.value = true;
  cityBlured.value = true;
  countryBlured.value = true;

  firstTimeSlotBlured.value = true;
  // imageUrlBlured.value = true;
  if (
    (hasWasher.value == true || hasDryer.value == true) && // if one machine is at least selected
    validTitle(title.value) &&
    validDescription(description.value) &&

    // if washer is selected
    (hasWasher.value &&
    validPrice(priceWashing.value) &&
    validDuration(cycle_wash_duration.value)) ||

    // if dryer is selected
    (hasDryer.value &&
    validPrice(priceDrying.value) &&
    validDuration(cycle_dry_duration.value)) &&

    validCapacity(max_capacity.value) &&
    validateAddress() &&
    validDateTime(firstTimeSlot.value)
    // && validimageUrl(imageUrl.value)
  )
    valid.value = true;
  return valid.value;
}

async function submit() {
  if (validate()) {
    submitted.value = true;

    if (createAddress.value == false) {
      adAddress.value = selectAddress(selectedAddress);
    } else {
      adAddress.value = await createPersonalAddress({
        streetL1: streetL1.value,
        zip: zip.value,
        city: city.value,
        country: country.value,
      });
    }

    const newAd = await createMachine({
      adTitle: title.value,
      adDescription: description.value,

      priceWashing: priceWashing.value,
      priceDrying: priceDrying.value,
      priceWashingDrying: calcTotalPrice(),
      detergentIncluded: detergentIncluded.value,

      maxCapacity: max_capacity.value,
      washDuration: cycle_wash_duration.value,
      dryDuration: cycle_dry_duration.value,

      hasWasher: hasWasher.value,
      hasDryer: hasDryer.value,

      addressId: adAddress.value.id,

      //imageUrl: imageUrl.value,
    });

    if (newAd.hasWasher == true && newAd.hasDryer == true) {
      machineType.value = "WASHANDDRY";
    } else if (newAd.hasWasher == true && newAd.hasDryer == false) {
      machineType.value = "WASH";
    } else if (newAd.hasDryer == true && newAd.hasWasher == false) {
      machineType.value = "DRYER";
    }

    await createTimeSlot(newAd.id, firstTimeSlot.value.toISOString(), machineType.value);

    router.push({ name: "machine", params: { id: newAd.id } });
    window.location.reload();
    useToast().success("Ad created successfully!");
  }
}
</script>

<style scoped>
@import "../../assets/auth.scss";

.form-check-label {
    padding-right: 10px;
    padding-left: 5px;
}

</style>
