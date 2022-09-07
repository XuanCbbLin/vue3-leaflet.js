<template>
  <div class="max-w-md absolute left-3 top-3 z-9999 bg-light-200">
    <div class="text-center" v-for="post in sideBar" :key="post">
      <div class="py-4 text-xl bg-[#0052B1] text-white">{{ post.title }}</div>
      <img :src="post.img" :alt="post.title" />
      <p class="pt-3 px-4 text-left">{{ post.desc }}</p>
    </div>
  </div>
</template>

<script setup>
import { sideBar } from "./map";
</script>
