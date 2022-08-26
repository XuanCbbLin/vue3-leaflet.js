<template>
  <ul class="h-[900px] w-[300px] overflow-y-scroll">
    <li
      class="text-center cursor-pointer px-2 py-3 hover:bg-dark-700 hover:text-light-200"
      :class="currentCityId === city.id ? 'bg-dark-700 text-white' : ''"
      v-for="city in cityData.features"
      :key="city"
      @mouseover="$emit('setAreaHighlight', city)"
      @mouseout="$emit('resetAreaHighlight', city)"
    >
      {{ city.properties.name }}
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  currentCityId: String,
  cityData: Object,
});
</script>
