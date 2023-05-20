<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-4">
        <!-- Balance card -->
        <div class="card mt-5">
          <div class="card-header bg-primary text-white text-center">
            <h1>Your Balance</h1>
          </div>
          <div class="card-body">
            <div v-if="user && user.balance >= 0" class="d-flex justify-content-center align-items-center">
              <h3>{{ user.balance }}€</h3>
              <img src="../assets/piece.png" alt="piece" class="icon ml-2" />
            </div>
            <p v-else class="text-danger text-center">Une erreur est survenue lors du chargement de votre solde.</p>
          </div>
          <div class="card-footer text-center">
            <router-link to="/topup">
              <button class="btn btn-secondary">Top Up Balance</button>
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-lg-8">
        <!-- User information -->
        <div class="card mt-5" v-if="user">
          <div class="card-header bg-info text-white text-center">
            <h2>Your Information</h2>
          </div>
          <div class="card-body">
            <table class="table table-striped">
              <tbody>
                <tr>
                  <th scope="row"><img src="../assets/username.png" alt="username" class="icon" /> Username</th>
                  <td>{{ user.username }}</td>
                </tr>
                <tr>
                  <th scope="row">
                    <img src="../assets/phonenumber.png" alt="phone number" class="icon" /> Phone Number
                  </th>
                  <td>{{ user.phoneNumber }}</td>
                </tr>
                <tr>
                  <th scope="row"><img src="../assets/email.png" alt="email" class="icon" /> Email</th>
                  <td>{{ user.email }}</td>
                </tr>
                <tr>
                  <th scope="row"><img src="../assets/name.png" alt="name" class="icon" /> First Name</th>
                  <td>{{ user.firstName }}</td>
                </tr>
                <tr>
                  <th scope="row"><img src="../assets/name.png" alt="name" class="icon" /> Last Name</th>
                  <td>{{ user.lastName }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import router from "../router/index.js";
import { useAuth } from "../utils/useAuthHook.js";

const { user, isAuthenticated } = storeToRefs(useAuth());
if (isAuthenticated.value === false) {
  router.push({ name: "login" });
}
</script>

<style scoped>
.icon {
  height: 20px;
  width: 20px;
  margin-right: 5px;
}
</style>
