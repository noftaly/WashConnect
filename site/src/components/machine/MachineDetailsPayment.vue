<template>
  <div class="card">
    <div class="card-body d-flex flex-column gap-3">
      <div>
        <p class="m-0"><PriceFormatted :price="machine.priceWashingDrying" notation="compact" /></p>
      </div>

      <!-- <div>
        <div v-if="machine.stockQuantity > 0" class="mb-1">
          <p class="text-success">
            In stock <span v-if="machine.stockQuantity < 10">(only {{ machine.stockQuantity }} left!)</span>
          </p>
          <p class="my-0 small text-dark"><font-awesome-icon icon="fa-solid fa-check" /> Receive in 2 days</p>
          <p class="my-0 small text-dark"><font-awesome-icon icon="fa-solid fa-check" /> Giftable</p>
        </div>
        <div v-else>
          <p class="text-danger">Out of stock</p>
        </div>
      </div> -->

      <!-- Quantity selector -->
      <!-- <div class="d-flex align-items-center gap-2">
        Quantity:
        <input
          type="number"
          class="form-control form-control-sm text-center"
          v-model="quantity"
          min="1"
          :max="machine.stockQuantity"
        />
      </div> -->

      <p>AGENDA TBD</p>

      <div v-if="isAuthenticated">
        <button class="btn btn-outline-primary w-100 mb-1" @click="">Book this machine</button>
      </div>
      <div v-else>
        <p>
          Please <RouterLink to="/login">login</RouterLink> or <RouterLink to="/register">register</RouterLink> to add
          this machine to your cart.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import PriceFormatted from "../formatters/PriceFormatted.vue";
import { useAuth } from "../../utils/useAuthHook.js";
import { useCartStore } from "../../stores/cart.js";
import { useMachinesStore } from "../../stores/machines.js";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const { isAuthenticated } = storeToRefs(useAuth());
const { getMachineById } = useMachinesStore();

const machine = getMachineById(props.id);
</script>
