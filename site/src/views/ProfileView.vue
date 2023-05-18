<!-- Page de profil de l'utilisateur (consulter & modifier les informations personnelles)
+ permettra de rediriger vers les pages de solde et d'historiques des annonces -->
<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-8 col-md-6 col-lg-4">
          <!-- User information -->
          <div class="card mt-5" v-if="user">
            <div class="card-header bg-info text-white text-center">
              <h2>Your Information</h2>
            </div>
            <div class="card-body">
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <th scope="row"><img src="../assets/username.png" alt="username" class="icon"> Username</th>
                    <td>{{ user.username }}</td>
                  </tr>
                  <tr>
                    <th scope="row"><img src="../assets/phonenumber.png" alt="phone number" class="icon"> Phone Number</th>
                    <td>{{ user.phoneNumber }}</td>
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
    import { useAuthStore } from "../stores/auth.js";
    
    const { user } = storeToRefs(useAuthStore());
  </script>
  
  <style scoped>
    .icon {
      height: 20px;
      width: 20px;
      margin-right: 5px;
    }
  </style>
  