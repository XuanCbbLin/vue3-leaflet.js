<template>
  <div class="max-w-md h-full px-4 overflow-y-scroll">
    <div v-for="travel in travelList" :key="travel" ref="postDoms">
      <div class="text-center py-4 text-xl">{{ travel.title }}</div>
      <img :src="travel.img" :alt="travel.title" ref="imgs" />
      <p class="pt-2 pb-8">{{ travel.dsc }}</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

defineProps({
  travelList: Array,
});

const emit = defineEmits(["getPost", "moveMarker"]);

const postDoms = ref(null);
const imgs = ref(null);

const callback = (entry) => {
  entry.forEach((aa) => {
    if (aa.intersectionRatio === 1) {
      emit("moveMarker", aa.target);
    }
  });
};

const option = {
  threshold: [1],
};

const observer = new IntersectionObserver(callback, option);

onMounted(() => {
  emit("getPost", postDoms.value);

  let i = 0;
  imgs.value.forEach((item) => {
    const img = new Image();
    img.src = item.src;

    img.addEventListener("load", () => {
      i += 1;
      if (imgs.value.length === i) {
        postDoms.value.forEach((dom) => {
          observer.observe(dom);
        });
      }
    });
  });
});
</script>
