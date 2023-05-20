<template>
  <div class="d-flex ml-4 mt-5 justify-content-center">
    <img id="logo" class="image-fluid w-15" style="width: 15%" src="../assets/Logo_WashConnect.png" />
  </div>

  <br />
  <h1 id="title" class="d-flex ml-3 justify-content-center">WashConnect</h1>
  <h2 Class="d-flex ml-3 mb-3 justify-content-center" style="font-size: 30px">Hello new washing lover!</h2>

  <div class="alert alert-danger" v-if="error">
    {{ error }}
  </div>

  <div class="px-5 py-5">
    <div class="form-data" v-if="!submitted">
      <!-- Names -->
      <div class="row">
        <!-- First Name -->
        <div class="col-md-4 forms-inputs mb-4">
          <span>First Name</span>
          <input
            autocomplete="off"
            type="text"
            v-model="firstName"
            :class="{ 'form-control': true, 'is-invalid': !validName(firstName) && firstNameBlured }"
            @blur="firstNameBlured = true"
            @keyup.enter="submit"
          />
          <div class="invalid-feedback">A valid first name is required!</div>
        </div>

        <!-- Last Name -->
        <div class="col-md-4 forms-inputs mb-4">
          <span>Last Name</span>
          <input
            autocomplete="off"
            type="text"
            v-model="lastName"
            :class="{ 'form-control': true, 'is-invalid': !validName(lastName) && lastNameBlured }"
            @blur="lastNameBlured = true"
            @keyup.enter="submit"
          />
          <div class="invalid-feedback">A valid last name is required!</div>
        </div>

        <!-- Username -->
        <div class="col-md-4 forms-inputs mb-4">
          <span>Username</span>
          <input
            autocomplete="off"
            type="text"
            v-model="username"
            :class="{ 'form-control': true, 'is-invalid': !validName(username) && usernameBlured }"
            @blur="usernameBlured = true"
            @keyup.enter="submit"
          />
          <div class="invalid-feedback">A valid username is required!</div>
        </div>
      </div>

      <!-- Email -->
      <div class="forms-inputs mb-4">
        <span>Email</span>
        <input
          autocomplete="off"
          type="text"
          v-model="email"
          :class="{ 'form-control': true, 'is-invalid': !validEmail(email) && emailBlured }"
          @blur="emailBlured = true"
          @keyup.enter="submit"
        />
        <div class="invalid-feedback">A valid email is required!</div>
      </div>

      <!-- Phone number -->
      <div class="forms-inputs mb-4">
        <span>Phone number</span>
        <input
          autocomplete="off"
          type="text"
          v-model="phoneNumber"
          :class="{ 'form-control': true, 'is-invalid': !validPhoneNumber(phoneNumber) && phoneNumberBlured }"
          @blur="phoneNumberBlured = true"
          @keyup.enter="submit"
        />
        <div class="invalid-feedback">A valid phone number is required!</div>
      </div>

      <!-- Password -->
      <div class="forms-inputs mb-4">
        <span>Password</span>
        <input
          autocomplete="off"
          type="password"
          v-model="password"
          :class="{ 'form-control': true, 'is-invalid': !validPassword(password) && passwordBlured }"
          @blur="passwordBlured = true"
          @keyup.enter="submit"
        />
        <div class="invalid-feedback">Password must have at least 8 characters!</div>
      </div>

      <div>
        <button @click.prevent="submit" class="btn btn-dark w-100">Register</button>
      </div>
    </div>
  </div>

  <p class="text-center">Already have an account? <RouterLink to="/login">Login here</RouterLink>.</p>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import router from "../router";
import { useAuth } from "../utils/useAuthHook.js";

const { isAuthenticated } = storeToRefs(useAuth());
const { register } = useAuth();

if (isAuthenticated.value === true) {
  router.push({ name: "home" });
}

const firstName = ref("");
const firstNameBlured = ref(false);
const lastName = ref("");
const lastNameBlured = ref(false);
const username = ref("");
const usernameBlured = ref(false);

const email = ref("");
const emailBlured = ref(false);
const phoneNumber = ref("");
const phoneNumberBlured = ref(false);
const valid = ref(false);
const submitted = ref(false);
const password = ref("");
const passwordBlured = ref(false);

const error = ref("");

function validEmail(email) {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(String(email).toLowerCase());
}

function validPhoneNumber(phoneNumber) {
  const phoneNumberRegex =
    /^(?:(?:\+|00)33(?:0)?[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/gim;
  return phoneNumberRegex.test(
    String(phoneNumber)
      .toLowerCase()
      .replace(/[\s()]/g, "")
  );
}

function validName(name) {
  return name.length > 0;
}

function validPassword(password) {
  return password.length > 7;
}

function validate() {
  firstNameBlured.value = true;
  lastNameBlured.value = true;
  usernameBlured.value = true;
  emailBlured.value = true;
  phoneNumberBlured.value = true;
  passwordBlured.value = true;
  if (
    validName(firstName.value) &&
    validName(lastName.value) &&
    validName(username.value) &&
    validEmail(email.value) &&
    validPhoneNumber(phoneNumber.value) &&
    validPassword(password.value)
  )
    valid.value = true;
  return valid.value;
}

async function submit() {
  if (validate()) {
    submitted.value = true;
    try {
      await register({
        firstName: firstName.value,
        lastName: lastName.value,
        username: username.value,
        email: email.value,
        phoneNumber: phoneNumber.value,
        password: password.value,
      });
      router.push({ name: "login" });
    } catch (err) {
      error.value = err.response?.data?.message ?? "  Oups, Something went wrong";
    } finally {
      submitted.value = false;
    }
  }
}
</script>

<style scoped>
@import "../assets/auth.scss";
</style>
