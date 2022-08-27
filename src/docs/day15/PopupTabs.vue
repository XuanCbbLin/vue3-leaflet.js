<template>
  <div class="h-[100vh]" ref="mapContent"></div>
  <IntroduceBox :currentName="currentName" :introduceData="introduceData" @change="update" />
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import IntroduceBox from "./IntroduceBox.vue";

let map = {};
const mapContent = ref(null);
const icon = L.icon({
  iconUrl: "/src/assets/day14-icon/maps-and-flags.png",
  iconSize: [60, 60],
  iconAnchor: [30, 60],
  popupAnchor: [0, -60],
});

const customOptions = {
  minWidth: "300",
};

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

const update = (dom1) => {
  dom.value = dom1;
};

let marker = {};

onMounted(() => {
  console.log("parent");

  map = L.map(mapContent.value).setView([23.695, 121.102], 8);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  marker = L.marker([23.58412603264412, 120.83038330078126], { icon }).bindPopup(
    dom.value,
    customOptions
  );

  marker.addTo(map).openPopup();
});
</script>
