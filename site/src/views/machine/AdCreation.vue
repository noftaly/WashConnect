<template>
  <main class="container my-5">
    <div class="d-flex justify-content-center">
      <img class="mt-5" style="width: 35%" src="../../assets/Logo_WashConnect.png" />
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

              <!-- Price -->
              <div class="forms-inputs mb-4">
                <span>Price</span>
                <input
                  autocomplete="off"
                  type="number"
                  v-model="price"
                  :class="{ 'form-control': true, 'is-invalid': !validPrice(price) && priceBlured }"
                  @blur="priceBlured = true"
                  @keyup.enter="submit"
                />
                <div class="invalid-feedback">A valid price is required!</div>
              </div>

              <!-- Stock Quantity -->
              <div class="forms-inputs mb-4">
                <span>Stock Quantity</span>
                <input
                  autocomplete="off"
                  type="number"
                  v-model="stockQty"
                  :class="{ 'form-control': true, 'is-invalid': !validStockQty(stockQty) && stockQtyBlured }"
                  @blur="stockQtyBlured = true"
                  @keyup.enter="submit"
                />
                <div class="invalid-feedback">A valid stock quantity is required!</div>
              </div>

              <!-- Image URL -->
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
import { useAuthStore, useMachinesStore } from "../../stores";

const { isAuthenticated } = storeToRefs(useAuthStore());
const { createMachine } = useadsStore();

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
const price = ref(0);
const priceBlured = ref(false);
const stockQty = ref(0);
const stockQtyBlured = ref(false);
const imageUrl = ref("");
const imageUrlBlured = ref(false);

const initCharacteristics = {
  manufacturer: "manufacturer",
  category: "commercial",
  passengers: 1,
  length: 1,
  height: 1,
  wingspan: 1,
  weight: 1,
  engines: 1,
  maxSpeed: 1,
  range: 1,
  cruiseSpeed: 1,
  fuelCapacity: 1,
  fuelConsumption: 1,
};

const valid = ref(false);
const submitted = ref(false);

function validTitle(title) {
  return title.length > 0;
}


function validDescription(description) {
  return description.length > 0;
}

function validPrice(price) {
  return price > 0;
}

function validStockQty(stockQty) {
  return stockQty > 0;
}

function validimageUrl(imageUrl) {
  return imageUrl.length > 0;
}

function validate() {
  titleBlured.value = true;
  descriptionBlured.value = true;
  priceBlured.value = true;
  stockQtyBlured.value = true;
  imageUrlBlured.value = true;
  if (
    validTitle(title.value) &&
    validDescription(description.value) &&
    validPrice(price.value) &&
    validStockQty(stockQty.value) &&
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
      price: price.value,
      stockQuantity: stockQty.value,
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
