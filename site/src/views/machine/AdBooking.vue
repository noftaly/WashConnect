<template>
  <main class="container my-5">
    <div class="d-flex justify-content-center">
      <img class="mt-5" style="width: 25%" src="../../assets/Logo_WashConnect.png" />
    </div>
    <h1 class="text-center mt-5">Book your machine!</h1>

    <!-- Machine card -->
    <div class="justify-content-center">Machine Card here TBD</div>

    <!-- Timeslot selection -->
    <div>
      <h2 class="text-center mt-5 mb-3">Select yout timeslot:</h2>
      <div class="dropdown d-flex justify-content-center">
        <button
          class="btn btn-primary dropdown-toggle"
          type="button"
          id="hoursDropdown"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {{ selectedHour || "Hours" }}
        </button>
        <div class="dropdown-menu" aria-labelledby="hoursDropdown" style="max-height: 280px; overflow-y: auto">
          <a class="dropdown-item" href="#" @click="selectHour('00')">00</a>
          <a class="dropdown-item" href="#" @click="selectHour('01')">01</a>
          <a class="dropdown-item" href="#" @click="selectHour('02')">02</a>
          <a class="dropdown-item" href="#" @click="selectHour('03')">03</a>
          <a class="dropdown-item" href="#" @click="selectHour('04')">04</a>
          <a class="dropdown-item" href="#" @click="selectHour('05')">05</a>
          <a class="dropdown-item" href="#" @click="selectHour('06')">06</a>
          <a class="dropdown-item" href="#" @click="selectHour('07')">07</a>
          <a class="dropdown-item" href="#" @click="selectHour('08')">08</a>
          <a class="dropdown-item" href="#" @click="selectHour('09')">09</a>
          <a class="dropdown-item" href="#" @click="selectHour('10')">10</a>
          <a class="dropdown-item" href="#" @click="selectHour('11')">11</a>
          <a class="dropdown-item" href="#" @click="selectHour('12')">12</a>
          <a class="dropdown-item" href="#" @click="selectHour('13')">13</a>
          <a class="dropdown-item" href="#" @click="selectHour('14')">14</a>
          <a class="dropdown-item" href="#" @click="selectHour('15')">15</a>
          <a class="dropdown-item" href="#" @click="selectHour('16')">16</a>
          <a class="dropdown-item" href="#" @click="selectHour('17')">17</a>
          <a class="dropdown-item" href="#" @click="selectHour('18')">18</a>
          <a class="dropdown-item" href="#" @click="selectHour('19')">19</a>
          <a class="dropdown-item" href="#" @click="selectHour('20')">20</a>
          <a class="dropdown-item" href="#" @click="selectHour('21')">21</a>
          <a class="dropdown-item" href="#" @click="selectHour('22')">22</a>
          <a class="dropdown-item" href="#" @click="selectHour('23')">23</a>
        </div>

        <span class="mx-2" style="font-size: 20px">:</span>
        <button
          class="btn btn-primary dropdown-toggle"
          type="button"
          id="minutesDropdown"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          {{ selectedMinutes || "Minutes" }}
        </button>
        <div class="dropdown-menu" aria-labelledby="minutesDropdown" style="max-height: 280px; overflow-y: auto">
          <a class="dropdown-item" href="#" @click="selectMinutes('00')">00</a>
          <a class="dropdown-item" href="#" @click="selectMinutes('05')">05</a>
          <a class="dropdown-item" href="#" @click="selectMinutes('10')">10</a>
          <a class="dropdown-item" href="#" @click="selectMinutes('15')">15</a>
          <a class="dropdown-item" href="#" @click="selectMinutes('20')">20</a>
          <a class="dropdown-item" href="#" @click="selectMinutes('25')">25</a>
          <a class="dropdown-item" href="#" @click="selectMinutes('30')">30</a>
          <a class="dropdown-item" href="#" @click="selectMinutes('35')">35</a>
          <a class="dropdown-item" href="#" @click="selectMinutes('40')">40</a>
          <a class="dropdown-item" href="#" @click="selectMinutes('45')">45</a>
          <a class="dropdown-item" href="#" @click="selectMinutes('50')">50</a>
          <a class="dropdown-item" href="#" @click="selectMinutes('55')">55</a>
        </div>
      </div>
    </div>

    <!-- Payment -->
    <div class="mt-5">
      <div class="alert alert-warning alert-sm text-center" role="alert">
        By clicking the button below, x € will be deducted from your balance.
      </div>
      <div class="d-flex justify-content-center">
        <button class="btn btn-primary btn-lg">Book</button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useToast } from "vue-toastification";
import router from "../../router/index.js";
import { useAuth } from "../../utils/useAuthHook.js";
import { useMachinesStore } from "../../stores/machines.js";

const { isAuthenticated } = storeToRefs(useAuth());
if (!isAuthenticated.value) {
  router.push({ title: "login" });
}

function selectHour(hour) {
  this.selectedHour = hour;
}

function selectMinutes(minutes) {
  this.selectedMinutes = minutes;
}
</script>
