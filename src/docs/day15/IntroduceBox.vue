<template>
  <div class="h-[325px]" ref="dom">
    <ul class="flex">
      <li
        class="w-[50%] py-3 text-center cursor-pointer"
        :class="currentName === introduce.name ? 'bg-dark-700 text-white' : ''"
        v-for="introduce in introduceData"
        :key="introduce"
        @click="currentName = introduce.name"
      >
        {{ introduce.name }}
      </li>
    </ul>
    <div v-for="introduce in introduceData" :key="introduce">
      <template v-if="currentName === introduce.name">
        <img :src="introduce.img" :alt="introduce.name" />
        <p>{{ introduce.content }}</p>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const props = defineProps({
  introduceData: Array,
  currentName: String,
});

const emit = defineEmits(["getDom"]);

const dom = ref(null);

onMounted(() => {
  emit("getDom", dom.value);
});
</script>
