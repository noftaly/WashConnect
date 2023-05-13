<template>
    <div class="top-up-container">
      <h1 class="top-up-title">Top Up Your Balance</h1>
      <form @submit.prevent="topUpBalance">
        <label for="amount">How much money do you want to put:</label>
        <input v-model="amount" type="number" id="amount" name="amount" min="0">
        <button type="submit">Top Up</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  import { storeToRefs } from "pinia";
  import { useAuthStore } from "../stores/auth.js";
  
  const { user, getBalance } = storeToRefs(useAuthStore());
  const amount = ref(0);
  
  const topUpBalance = async () => {
    try {
      const response = await axios.post("http://localhost:5050/auth/topup", { amount: amount.value });
      if (response.status === 200) {
        user.balance += amount.value;
        amount.value = 0;
      }
    } catch (error) {
      console.log('An error occurred while topping up the balance:', error);
    }
  };
  </script>
  
  <style scoped>
  .top-up-container {
    background-color: #e0f7fa;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    color: #006064;
  }
  
  .top-up-title {
    text-align: center;
    color: #00838f;
    font-size: 24px;
  }
  
  button {
    display: block;
    margin: 20px auto;
  }
  </style>
  