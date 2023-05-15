<template>
  <div class="top-up-container">
    <h1>Top Up Your Balance</h1>
    
    <div class="payment-options">
      <input type="radio" id="saved-card" value="saved" v-model="paymentMethod">
      <label for="saved-card">
        <img src="../assets/visa-logo.png" alt="Visa logo">
        ****3456
      </label>
      
      <input type="radio" id="new-card" value="new" v-model="paymentMethod">
      <label for="new-card">Enter New Card Details</label>
    </div>
    
    <div v-if="paymentMethod === 'new'">
      <label for="card-number">Card Number:</label>
      <input type="text" id="card-number" v-model="cardNumber" placeholder="1234 5678 9012 3456" />
  
      <label for="expiry-date">Expiry Date:</label>
      <input type="text" id="expiry-date" v-model="expiryDate" placeholder="MM/YY" />
  
      <label for="cvc">CVC:</label>
      <input type="text" id="cvc" v-model="cvc" placeholder="123" />
    </div>

    <label for="amount">Amount to Top Up:</label>
    <input type="number" id="amount" v-model.number="amount" />

    <button @click="topUpAndRedirect(amount)">Top Up</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from "../stores/auth.js";
import { useRouter } from 'vue-router';

let cardNumber = ref('');
let expiryDate = ref('');
let cvc = ref('');
let amount = ref(0);
let paymentMethod = ref('');

const { topUpBalance } = useAuthStore();
const router = useRouter();  

const topUpAndRedirect = async (amount) => {  
  await topUpBalance(amount);
  router.push({ name: 'balance' });  // Redirection vers la page de balance.
};

</script>

<style scoped>
.top-up-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #e0f7fa;
  padding: 20px;
  border-radius: 8px;
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
