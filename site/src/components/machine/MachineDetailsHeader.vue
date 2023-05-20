<template>
  <div class="text-wrap">
    <p class="fs-4">{{ props.description }}</p>
    <p class="text-muted">Posted by {{ username }}</p>
    <p class="text-muted">Located at {{ addressStr }}</p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUsersStore } from "../../stores/users";

const { getUser } = useUsersStore();
const user = ref({});

const props = defineProps({
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
});

const addressStr = computed(() => {
  const { line1, zip, city, country } = props.address;
  return `${line1}, ${zip} ${city}, ${country}`;
});

const username = computed(() => {
  return user.value ? user.value.username : "";
});

async function getInfos(userId) {
  try {
    // addresses.value = await getPersonalAddresses();
    user.value = await getUser(userId);
  } catch (error) {
    console.error(error);
  }
}

getInfos(props.userId);
</script>
