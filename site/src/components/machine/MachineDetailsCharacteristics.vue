<template>
    <h5 class="my-3">Characteristics</h5>
    <table class="table">
      <tbody>
        <tr v-for="[name, value] in machineCharacteristics" :key="name">
          <td class="py-1">
            <b>{{ characteristicsMap[name][0] }}</b>
          </td>
          <td class="py-1">
            {{ value }} <span class="text-muted">{{ characteristicsMap[name][1] }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script setup>
  import { characteristicsMap } from "../../utils/constants";
  
  const props = defineProps({
    characteristic: {
      type: Object,
      required: true,
    },
  });
  
  const machineCharacteristics = Object.entries(props.characteristic).filter(([name]) =>
    Object.keys(characteristicsMap).includes(name)
  );
  </script>
  