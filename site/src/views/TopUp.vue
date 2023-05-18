<template>
  <div class="container d-flex justify-content-center align-items-center vh-100">
    <div class="card p-5 w-50">
      <h1 class="text-center mb-4">Top Up Your Balance</h1>

      <div class="form-check mb-3">
        <input class="form-check-input" type="radio" name="paymentMethod" id="savedCard" value="savedCard" v-model="paymentMethod">
        <label class="form-check-label" for="savedCard">
          <img src=" ../assets/visa.png" alt="Visa Logo" height="24px"> ****3456
        </label>
      </div>

      <div class="form-check mb-3">
        <input class="form-check-input" type="radio" name="paymentMethod" id="newCard" value="newCard" v-model="paymentMethod">
        <label class="form-check-label" for="newCard">
          Enter New Card Details
        </label>
      </div>

      <div v-if="paymentMethod === 'newCard'">

        <label for="card-type">Card Type:</label>
        
    <select id="card-type" v-model="cardType">
      <option value="visa">Visa</option>
      <option value="mastercard">Mastercard</option>
      <option value="cb">Carte Bancaire</option>
      
    </select>
        
        <label for="card-number" class="form-label">Card Number:</label>
        <input type="text" id="card-number" v-model="cardNumber" placeholder="1234 5678 9012 3456" class="form-control mb-3">

        <label for="expiry-date" class="form-label">Expiry Date:</label>
        <input type="text" id="expiry-date" v-model="expiryDate" placeholder="MM/YY" class="form-control mb-3">

        <label for="cvc" class="form-label">CVC:</label>
        <input type="text" id="cvc" v-model="cvc" placeholder="123" class="form-control mb-3">

        <label for="card-name">Name on Card:</label>
        <input type="text" id="card-name" v-model="cardName" placeholder="Name Surname" />

        <label for="country">Country:</label>
        <input type="text" id="country" v-model="country" placeholder="Country" />
      </div>

      <label for="amount" class="form-label">Amount to Top Up:</label>
      <input type="number" id="amount" v-model.number="amount" class="form-control mb-3">

      <button @click="topUpAndRedirect(amount)" class="btn btn-primary w-100">Top Up</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from "../stores/auth.js";
import { useRouter } from 'vue-router';

  let cardType = ref('');
  let cardNumber = ref('');
  let expiryDate = ref('');
  let cvc = ref('');
  let cardName = ref('');
  let country = ref('');
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
