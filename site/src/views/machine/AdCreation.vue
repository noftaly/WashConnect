<template>
  <main class="container my-5">
    <div class="d-flex justify-content-center">
      <img class="mt-5" style="width: 25%" src="../../assets/Logo_WashConnect.png" />
    </div>
    <h1 class="text-center mt-5">Creating new ad</h1>
    <div class="alert alert-warning my-3" role="alert">
      <h4 class="alert-heading">Careful!</h4>
      <p>
        You are creating a new ad. Save the changes by clicking the green button on the right. When clicking this
        button, everyone will see the updated version from now on. There is no way to undo this action.
      </p>
    </div>

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

            <!-- Address -->
            <div class="row">
              <div class="col-md-4 forms-inputs mb-4">
                <span>Address</span>
                <input
                  autocomplete="off"
                  type="text"
                  v-model="address"
                  :class="{ 'form-control': true, 'is-invalid': !validAddress(address) && addressBlured }"
                  @blur="addressBlured = true"
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
            </div>

            <!-- Price -->
            <div class="forms-inputs mb-4">
              <span>Washing Price</span>
              <input
                autocomplete="off"
                type="number"
                v-model="price"
                :class="{ 'form-control': true, 'is-invalid': !validPrice(price) && priceBlured }"
                @blur="priceBlured = true"
                @keyup.enter="submit"
              />
              <div class="invalid-feedback">A valid washing price is required!</div>
            </div>

            <!-- Price -->
            <div class="forms-inputs mb-4">
              <span>Drying Price</span>
              <input
                autocomplete="off"
                type="number"
                v-model="price"
                :class="{ 'form-control': true, 'is-invalid': !validPrice(price) && priceBlured }"
                @blur="priceBlured = true"
                @keyup.enter="submit"
              />
              <div class="invalid-feedback">A valid drying price is required!</div>
            </div>

            <!-- Image URL -->
            <br />
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
            </div>

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

const { isAuthenticated } = storeToRefs(useAuth());
const { createMachine } = useMachinesStore();

if (!isAuthenticated.value) {
  router.push({ title: "login" });
}
// } else if (!isAdmin.value) {
//   router.push({ title: "home" });
// }

const title = ref("");
const titleBlured = ref(false);
const description = ref("");
const descriptionBlured = ref(false);

const address = ref("");
const addressBlured = ref(false);
const zipCode = ref(0);
const zipCodeBlured = ref(false);
const city = ref("");
const cityBlured = ref(false);

const price = ref(0);
const priceBlured = ref(false);
const imageUrl = ref("");
const imageUrlBlured = ref(false);

const initCharacteristics = {
  manufacturer: "manufacturer",
  max_capacity: 5,
  cycle_wash_duration: 20,
  cycle_dry_duration: 20,
};

const valid = ref(false);
const submitted = ref(false);

function validTitle(title) {
  return title.length > 0;
}

function validDescription(description) {
  return description.length > 0;
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

function validPrice(price) {
  return price > 0;
}

function validimageUrl(imageUrl) {
  return imageUrl.length > 0;
}

function validate() {
  titleBlured.value = true;
  descriptionBlured.value = true;
  addressBlured.value = true;
  zipCodeBlured.value = true;
  cityBlured.value = true;
  priceBlured.value = true;
  imageUrlBlured.value = true;
  if (
    validTitle(title.value) &&
    validDescription(description.value) &&
    validAddress(address.value) &&
    validZipCode(zipCode.value) &&
    validCity(city.value) &&
    validPrice(price.value) &&
    validimageUrl(imageUrl.value)
  )
    valid.value = true;
  return valid.value;
}

async function submit() {
  if (validate()) {
    submitted.value = true;
    const newAd = await createad({
      title: title.value,
      description: description.value,
      address: address.value,
      zipCode: zipCode.value,
      city: city.value,
      price: price.value,
      imageUrl: imageUrl.value,
      characteristics: initCharacteristics,
    });
    router.push({ title: "new-ad", params: { id: newAd.id } });
    window.location.reload();
    useToast().success("Ad created successfully!");
  }
}
</script>

<style scoped>
@import "../../assets/auth.scss";
</style>
