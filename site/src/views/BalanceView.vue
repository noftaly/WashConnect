<!-- Page pour gérer le solde de l'utilisateur (consulter & recharger le solde) -->
<template>
  <div class="balance-container">
    <h1 class="balance-title">Votre solde</h1>
    <p v-if="loading" class="balance-loading">Chargement...</p>
    <p v-else-if="balance >= 0" class="balance-value">{{ balance }}€</p>
    <p v-else class="balance-error">Une erreur est survenue lors du chargement de votre solde.</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { getBalance } from "../components/LayoutNavbar.vue";

export default {
  name: "Balance",
  setup() {
    const balance = ref(null);
    const loading = ref(true);

    const fetchBalance = async () => {
      try {
        const result = await getBalance();
        balance.value = result;
        loading.value = false;
      } catch (err) {
        console.error(err);
        balance.value = -1;
        loading.value = false;
      }
    };

    fetchBalance();

    return { balance, loading };
  },
};
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

.balance-loading,
.balance-value,
.balance-error {
  text-align: center;
  color: #006064;
  font-size: 18px;
}

.balance-error {
  color: #ff1744;
}
</style>
