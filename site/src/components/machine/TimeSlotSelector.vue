<template>
  <div>
    <label for="date-picker">Date:</label>
    <input type="date" id="date-picker" v-model="selectedDate" @input="updateDateTime"/>
    
    <label for="time-picker">Time:</label>
    <input type="time" id="time-picker" v-model="selectedTime" @input="updateDateTime"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDate: '',
      selectedTime: ''
    }
  },
  methods: {
    updateDateTime() {
      const dateTime = new Date(`${this.selectedDate}T${this.selectedTime}:00`)
      this.$emit('update', dateTime)
    }
  }
}
</script>


<style scoped>
.date-time-selector {
  display: flex;
  flex-direction: column;
}

.date-time-selector label {
  margin-left: 0.5rem;
}

</style>
