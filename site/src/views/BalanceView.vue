
<template>
    <div class="balance-container">
      <h1 class="balance-title">Your Balance</h1>
      <p v-if="loading" class="balance-loading">Loading...</p>
      <div v-else-if="user.balance >= 0" class="balance-display">
        <p class="balance-value">{{ user.balance }}€</p>
        <img src="../assets/piece.png" alt="piece" class="balance-icon">
      </div>
      <p v-else class="balance-error">Une erreur est survenue lors du chargement de votre solde.</p>
      <div class="balance-buttons">
        <button @click="increaseBalance">+10</button>
        <button @click="decreaseBalance">-10</button>
      </div>

      <router-link to="/topup">
      <button class="top-up-btn">Top Up Balance</button>
    </router-link>
    
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { storeToRefs } from "pinia";
  import { useAuthStore } from "../stores/auth.js";
  import axios from 'axios';  // import axios to make HTTP requests
  
  const { user, getBalance } = storeToRefs(useAuthStore());
  const loading = ref(true);
  
  const fetchBalance = async () => {
    try {
      await getBalance();
      loading.value = false;
    } catch (err) {
      console.error(err);
      user.balance = -1;
      loading.value = false;
    }
  };
  
  

async function increaseBalance() {
  try {
    const response = await axios.post("http://localhost:5050/auth/topup", { amount: 10 });
    if (response.status === 200) {
      user.balance += 10;
    }
  } catch (error) {
    console.log('An error occurred while increasing the balance:', error);
  }
}

async function decreaseBalance() {
  try {
    const response = await axios.post("http://localhost:5050/auth/topup", { amount: -10 });
    if (response.status === 200) {
      user.balance -= 10;
    }
  } catch (error) {
    console.log('An error occurred while decreasing the balance:', error);
  }
}

  fetchBalance();
  </script>
  
  
  <style scoped>
  .balance-container {
    background-color: #e0f7fa;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    color: #006064;
  }
  
  .balance-title {
    text-align: center;
    color: #00838f;
    font-size: 24px;
  }
  
  .balance-loading, .balance-value, .balance-error {
    text-align: center;
    color: #006064;
    font-size: 18px;
  }
  
  .balance-error {
    color: #ff1744;
  }

  .balance-icon {
  height: 20px;
  width: 20px;
  margin-left: 10px;
  vertical-align: middle;
}

  </style>
  