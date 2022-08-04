<template>
  <div class="mapContainer" ref="mapContainer"></div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { onMounted, ref } from "vue";

const mapContainer = ref(null);

onMounted(() => {
  const map = L.map(mapContainer.value).setView([39.74739, -105], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    foo: "bar",
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  var someFeatures = [
    {
      type: "Feature",
      properties: {
        name: "Coors Field",
        show_on_map: true,
      },
      geometry: {
        type: "Point",
        coordinates: [-104.99404, 39.75621],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Busch Field",
        show_on_map: true,
      },
      geometry: {
        type: "Point",
        coordinates: [-104.98404, 39.74621],
      },
    },
  ];

  L.geoJSON(someFeatures, {
    filter: function (feature, layer) {
      console.log(feature.properties);
      return feature.properties.show_on_map;
    },
  }).addTo(map);
});
</script>

<style lang="scss" scoped>
.mapContainer {
  height: 600px;
}
</style>
