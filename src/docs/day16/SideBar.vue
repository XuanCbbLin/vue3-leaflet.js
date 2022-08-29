<template>
  <div class="max-w-md h-full px-4 overflow-y-scroll">
    <div v-for="travel in travelList" :key="travel">
      <div class="text-center py-4 text-xl">{{ travel.title }}</div>
      <img :src="travel.img" :alt="travel.title" />
      <p class="pt-2 pb-8">{{ travel.dsc }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  travelList: Array,
});
</script>
