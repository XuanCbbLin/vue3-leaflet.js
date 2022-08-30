<template>
  <div class="max-w-md h-full px-4 overflow-y-scroll" ref="postParent">
    <div v-for="travel in travelList" :key="travel" :ref="getPostDom">
      <div class="text-center py-4 text-xl">{{ travel.title }}</div>
      <img :src="travel.img" :alt="travel.title" />
      <p class="pt-2 pb-8">{{ travel.dsc }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";

defineProps({
  travelList: Array,
});

const emit = defineEmits(["getPost", "moveMarker"]);

const postDoms = reactive([]);
const postParent = ref(null);
const getPostDom = (dom) => {
  postDoms.push(dom);
};

onMounted(() => {
  emit("getPost", postDoms);
});
</script>
