<template>
  <Map :dom="dom" />
  <IntroduceBox :currentName="currentName" :introduceData="introduceData" @getDom="getDom" />
</template>

<script setup>
import { reactive, ref } from "vue";
import IntroduceBox from "./IntroduceBox.vue";
import Map from "./Map.vue";

const dom = ref(null);
const currentName = ref("tab");

const introduceData = reactive([
  {
    name: "tab",
    img: "https://picsum.photos/id/684/600/400",
    content: "Ipsum ratione nulla iure rem tempora, quasi quis minima consequatur",
  },
  {
    name: "tab2",
    img: "https://picsum.photos/id/685/600/400",
    content: "Lorem ipsum, dolor sit amet consectetur adipisicing elit",
  },
]);

const getDom = (boxDom) => {
  dom.value = boxDom;
};
</script>
