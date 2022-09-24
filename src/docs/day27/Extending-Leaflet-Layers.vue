<template>
  <!-- map -->
  <div class="h-[100vh]" ref="mapContent"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

let map = {};
const mapContent = ref(null);

const osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

L.TileLayer.Kitten = L.TileLayer.extend({
  getTileUrl: function () {
    var i = Math.ceil(Math.random() * 4);
    return "https://placekitten.com/256/256?image=" + i;
  },
  getAttribution: function () {
    return "<a href='https://placekitten.com/attribution.html'>PlaceKitten</a>";
  },
});

L.tileLayer.kitten = function () {
  return new L.TileLayer.Kitten();
};

console.log(L.TileLayer.Kitten);

onMounted(() => {
  map = new L.Map(mapContent.value, {
    center: [23.695, 121.102],
    zoom: 8,
  });

  L.tileLayer.kitten().addTo(map);
});
</script>
