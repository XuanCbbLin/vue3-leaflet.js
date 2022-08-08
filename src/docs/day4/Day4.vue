<template>
  <div class="mapContainer" ref="mapContainer"></div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { onMounted, ref } from "vue";
import {
  geojsonFeature,
  myLines,
  myStyle,
  states,
  someGeojsonFeature,
  geojsonMarkerOptions,
  geojsonFeatureForEachFeature,
  onEachFeature,
  someFeatures,
} from "./day4";

const mapContainer = ref(null);

onMounted(() => {
  const map = L.map(mapContainer.value).setView([39.74739, -105], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // 新增一個點座標
  // L.geoJSON(geojsonFeature).addTo(map);
  // or;
  // const myLayer = L.geoJSON().addTo(map);
  // myLayer.addData(geojsonFeature);

  // options
  // 設定style
  // L.geoJSON(myLines, {
  //   style: myStyle,
  // }).addTo(map);

  // options
  // 設定style 傳入函示方式
  // L.geoJSON(states, {
  //   style: function (feature) {
  //     console.log(feature);
  //     switch (feature.properties.party) {
  //       case "Republican":
  //         return { color: "#ff0000" };
  //       case "Democrat":
  //         return { color: "#0000ff" };
  //     }
  //   },
  // }).addTo(map);

  // pointToLayer
  // L.geoJSON(someGeojsonFeature, {
  //   pointToLayer: function (feature, latlng) {
  //     return L.circleMarker(latlng, geojsonMarkerOptions);
  //   },
  // }).addTo(map);

  // L.geoJSON(geojsonFeatureForEachFeature, {
  //   onEachFeature: onEachFeature,
  // }).addTo(map);

  //filter
  L.geoJSON(someFeatures, {
    filter: function (feature, layer) {
      return feature.properties.show_on_map;
    },
  }).addTo(map);

  map.on("click", (e) => {
    console.log(e.latlng);
  });
});
</script>

<style lang="scss" scoped>
.mapContainer {
  height: 600px;
}
</style>
