<template>
  <!-- map -->
  <div class="h-[100vh]" ref="mapContent">我是誰</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw";
import "leaflet-draw/dist/leaflet.draw.css";

let map = {};
const mapContent = ref(null);

const osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

onMounted(() => {
  map = new L.Map(mapContent.value, {
    center: [23.695, 121.102],
    zoom: 7,
  });

  L.tileLayer(osmUrl, {
    maxZoom: 19,
    attribution: attribution,
  }).addTo(map);

  // FeatureGroup is to store editable layers
  const drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);

  const drawControl = new L.Control.Draw({
    edit: {
      featureGroup: drawnItems,
    },
    draw: {
      polygon: false,
      marker: false,
      rectangle: { showArea: false },
    },
  });

  map.addControl(drawControl);

  // map.on(L.Draw.Event.CREATED, function (e) {
  //   console.log(e);

  //   const layer = e.layer;
  //   map.addLayer(layer);
  // });

  map.on("draw:created", function (e) {
    const layer = e.layer;
    map.addLayer(layer);
    console.log(e);
  });
});
</script>
