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
              <div class="forms-inputs mb-4">
                <span>Description</span>
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

            <!-- Machines Check boxes -->
            <div class="forms-check mb-4">
              <span>Which type of machine do you have ?</span>
              <hr />
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

              <div class="invalid-feedback">Please select one machine</div>
            </div>

            <br />

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

            <!-- Address -->
            <div class="row">
              <div class="col-md-6 forms-inputs mb-4">
                <span>Address</span>
                <input
                  autocomplete="off"
                  type="text"
                  v-model="streetL1"
                  :class="{ 'form-control': true, 'is-invalid': !validAddress(streetL1) && streetL1Blured }"
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
                  v-model="zipCode"
                  :class="{ 'form-control': true, 'is-invalid': !validZipCode(zipCode) && zipCodeBlured }"
                  @blur="zipCodeBlured = true"
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

              <div class="col-md-4 forms-inputs mb-4">
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
              <button @click.prevent="submit" class="btn btn-dark w-100">Create</button>
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
import { useAuth } from "../../utils/useAuthHook.js";
import { useMachinesStore } from "../../stores/machines.js";
import { useAddressesStore } from "../../stores/addresses.js";

const { isAuthenticated } = storeToRefs(useAuth());
const { createMachine } = useMachinesStore();
const { createPersonalAddress } = useAddressesStore();

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

const streetL1 = ref("");
const streetL1Blured = ref(false);
const zipCode = ref(0);
const zipCodeBlured = ref(false);
const city = ref("");
const cityBlured = ref(false);
const country = ref("");
const countryBlured = ref(false);

// const imageUrl = ref("");
// const imageUrlBlured = ref(false);

// const initCharacteristics = {
//   manufacturer: "manufacturer",
//   max_capacity: 5,
//   cycle_wash_duration: 20,
//   cycle_dry_duration: 20,
// };

const valid = ref(false);
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
  if(hasWasher.value == true) {
    priceWashingDrying.value = priceWashing.value;
  }
  if(hasDryer.value == true) {
    priceWashingDrying.value = priceDrying.value;
  }
  if(hasWasher.value == true && hasDryer.value == true) {
    priceWashingDrying.value = priceWashing.value + priceDrying.value;
  }
}

function validDuration(duration) {
  return duration > 0;
}

function validCapacity(capacity) {
  return capacity > 0;
}

function validAddress(address) {
  return address.length > 0;
}

function validZipCode(zipCode) {
  return zipCode > 0 && zipCode < 100000;
}

function validCity(city) {
  return city.length > 0;
}

function validCountry(country) {
  return country.length > 0;
}

// function validimageUrl(imageUrl) {
//   return imageUrl.length > 0;
// }

function validate() {
  titleBlured.value = true;
  descriptionBlured.value = true;

  priceWashingBlured.value = true;
  priceDryingBlured.value = true;
  cycle_wash_duration_blured.value = true;
  cycle_dry_duration_blured.value = true;
  max_capacity_blured.value = true;

  streetL1Blured.value = true;
  zipCodeBlured.value = true;
  cityBlured.value = true;
  countryBlured.value = true;
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
      validDuration(cycle_dry_duration.value) &&
      validCapacity(max_capacity.value)) &&

      validAddress(streetL1.value) &&
      validZipCode(zipCode.value) &&
      validCity(city.value) &&
      validCountry(country.value)
    // validimageUrl(imageUrl.value)
  )
    valid.value = true;
  return valid.value;
}

async function submit() {
  if (validate()) {
    submitted.value = true;
    const newAddress = await createPersonalAddress({
        streetL1: streetL1.value,
        zipCode: zipCode.value,
        city: city.value,
        country: country.value
      })

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

      address: newAddress.id,
      
      //imageUrl: imageUrl.value,
      //characteristics: initCharacteristics,
    });
    router.push({ name: "machine", params: { id: newAd.id } });
    window.location.reload();
    useToast().success("Ad created successfully!");
  }
}
</script>

<style scoped>
@import "../../assets/auth.scss";
</style>
