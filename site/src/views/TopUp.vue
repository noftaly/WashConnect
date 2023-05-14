<template>
    <div class="top-up-container">
      <h1>Top Up Your Balance</h1>
  
      <label for="card-number">Card Number:</label>
      <input type="text" id="card-number" v-model="cardNumber" placeholder="1234 5678 9012 3456" />
  
      <label for="expiry-date">Expiry Date:</label>
      <input type="text" id="expiry-date" v-model="expiryDate" placeholder="MM/YY" />
  
      <label for="cvc">CVC:</label>
      <input type="text" id="cvc" v-model="cvc" placeholder="123" />
  
      <label for="amount">Amount to Top Up:</label>
      <input type="number" id="amount" v-model.number="amount" />
  
      <button @click="topUpBalance(amount)">Top Up</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from "../stores/auth.js";

let cardNumber = ref('');
let expiryDate = ref('');
let cvc = ref('');
let amount = ref(0);

const { topUpBalance } = useAuthStore();
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
  