<template>
  <div class="d-flex ml-4 mt-5 justify-content-center">
    <img id="logo" class="image-fluid w-15" style="width: 15%" src="../assets/Logo_WashConnect.png" />
  </div>

  <br />
  <h1 id="title" class="d-flex ml-3 justify-content-center">WashConnect</h1>
  <h2 Class="d-flex ml-3 justify-content-center" style="font-size: 30px">Welcome back washer !</h2>

  <div class="alert alert-danger" v-if="error">
    {{ error }}
  </div>

  <div class="px-5 py-5">
    <div class="form-data">
      <!-- Username -->
      <div class="forms-inputs mb-4">
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

    <div class="mb-3">
      <button @click.prevent="submit" class="btn btn-dark w-100">Login</button>
    </div>
  </div>

  <p class="text-center">Don't have an account yet ? <RouterLink to="/register">Sign up here</RouterLink>.</p>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import router from "../router";
import { useAuth } from "../utils/useAuthHook.js";

const { isAuthenticated } = storeToRefs(useAuth());
const { login } = useAuth();

if (isAuthenticated.value === true) {
  router.push({ name: "home" });
}

const username = ref("");
const usernameBlured = ref(false);

const valid = ref(false);
const submitted = ref(false);
const password = ref("");
const passwordBlured = ref(false);

const error = ref("");

function validName(name) {
  return name.length > 0;
}

function validPassword(password) {
  return password.length > 7;
}

function validate() {
  usernameBlured.value = true;
  passwordBlured.value = true;
  if (validName(username.value) && validPassword(password.value)) valid.value = true;
  return valid.value;
}

async function submit() {
  if (validate()) {
    submitted.value = true;
    try {
      await login({
        username: username.value,
        password: password.value,
      });
      router.push({ name: "home" });
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
