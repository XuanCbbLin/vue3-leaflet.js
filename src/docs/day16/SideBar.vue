<template>
  <div class="max-w-md h-full px-4 overflow-y-scroll" ref="sideBarDom">
    <div v-for="travel in travelList" :key="travel">
      <div class="text-center py-4 text-xl">{{ travel.title }}</div>
      <img :src="travel.img" :alt="travel.title" />
      <p class="pt-2 pb-8">{{ travel.dsc }}</p>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";

const travelList = inject("travelList");
const sideBarDom = ref(null);

onMounted(() => {
  console.log(sideBarDom.value);
});
</script>
