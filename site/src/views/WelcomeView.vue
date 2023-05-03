<template>
  <div class="d-flex ml-4 mt-5 justify-content-center">
    <img id="logo" class="image-fluid w-15" style="width: 15%" src="../assets/Logo_WashConnect.png" />
  </div>

  <br />
  <h1 id="title" class="d-flex ml-3 justify-content-center">WashConnect</h1>
  <h2 Class="d-flex ml-3 mb-3 justify-content-center" style="font-size: 30px">Welcome!</h2>

  <br />
  <div
    id="welcome-alert"
    class="alert alert-primary ml-4 mt-5 mt-lg-4"
    style="width: 50%; background-color: #3697c8; top: 50%; left: 45%; transform: translate(-50%, -45%)"
    role="alert"
  >
    <div id="alert-text" style="color: white">
      Share your washing machine to your neighbors. <br />
      Join us now !
    </div>
  </div>

  <div>
    <RouterLink
      type="button"
      class="btn btn-primary btn-lg border-light ml-4 mb-6"
      style="background-color: #3697c8"
      :to="`/register`"
    >
      I'm not a member yet
    </RouterLink>

    <RouterLink
      type="button"
      id="login-btn"
      class="btn btn-outline-primary btn-lg border"
      style="color: #3697c8"
      :to="`/login`"
    >
      I already have an account
    </RouterLink>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { RouterLink } from "vue-router";
import router from "../router";
</script>

<style>
#title {
  font-family: "Open Sans";
  font-weight: bold;
  font-size: 40px;
}

#welcome-alert {
  margin-left: 5%;
  size: 80%;
}

#alert-text {
  text-align: center;
  font-size: 20px;
}

.btn {
  margin-left: 25%;
  margin-bottom: 1%;
  width: 50%;
}

.border {
  border-color: #3697c8;
}

#login_btn {
  color: white;
  background-color: transparent;
}
</style>
