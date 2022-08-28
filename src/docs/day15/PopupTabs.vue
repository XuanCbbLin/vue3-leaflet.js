<template>
  <Map :dom="dom" />
  <IntroduceBox :currentName="currentName" :introduceData="introduceData" @getDom="getDom" />
</template>

<script setup>
import { reactive, ref } from "vue";
import IntroduceBox from "./IntroduceBox.vue";
import Map from "./Map.vue";

const dom = ref(null);
const currentName = ref("a");

const introduceData = reactive([
  {
    name: "a",
    img: "https://picsum.photos/id/684/600/400",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum ratione nulla iure rem tempora, quasi quis minima consequatur aut veritatis dolor, omnis nobis vel eveniet reprehenderit, a porro ut quo!",
  },
  {
    name: "b",
    img: "https://picsum.photos/id/685/600/400",
    content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit",
  },
]);

const getDom = (dom1) => {
  dom.value = dom1;
};
</script>
