<template>
  <!-- map -->
  <div class="h-[600px] w-[600px]" ref="mapContent"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "@bepo65/leaflet.fullscreen/Control.FullScreen";
import "@bepo65/leaflet.fullscreen/Control.FullScreen.css";

let map = {};
const mapContent = ref(null);

onMounted(() => {
  map = new L.Map(mapContent.value, {
    center: [23.695, 121.102],
    zoom: 7,
    fullscreenControl: true,
    fullscreenControlOptions: {
      position: "topleft", // change the position of the button can be topleft, topright, bottomright or bottomleft, default topleft
      title: "Show me the fullscreen !", // change the title of the button, default Full Screen
      titleCancel: "Exit fullscreen mode", // change the title of the button when fullscreen is on, default Exit Full Screen
      content: null, // change the content of the button, can be HTML, default null
      forceSeparateButton: true, // force separate button to detach from zoom buttons, default false
      forcePseudoFullscreen: true, // force use of pseudo full screen even if full screen API is available, default false
    },
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  map.on("enterFullscreen", function () {
    console.log("entered fullscreen");
  });
});
</script>
