<template>
  <!-- map -->
  <div class="h-[100vh]" ref="mapContent"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/markercluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

let map = {};
const mapContent = ref(null);

const osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const markers = L.markerClusterGroup({
  spiderfyOnMaxZoom: true,
  zoomToBoundsOnClick: false,
  spiderLegPolylineOptions: {
    weight: 5,
    color: "red",
    opacity: 1,
  },
  iconCreateFunction: function (cluster) {
    return L.divIcon({ html: "<div>" + cluster.getChildCount() + "</div>" });
  },
});

const addressPoints = [
  [-37.8210922667, 175.2209316333, "2"],
  [-37.8210819833, 175.2213903167, "3"],
  [-37.8210881833, 175.2215004833, "3A"],
  [-37.8211946833, 175.2213655333, "1"],
  [-37.8209458667, 175.2214051333, "5"],
  [-37.8208292333, 175.2214374833, "7"],
  [-37.8325816, 175.2238798667, "537"],
  [-37.8315855167, 175.2279767, "454"],
  [-37.8096336833, 175.2223743833, "176"],
  [-37.80970685, 175.2221815833, "178"],
  [-37.8102146667, 175.2211562833, "190"],
  [-37.8088037167, 175.2242227, "156"],
];

for (let i = 0; i < addressPoints.length; i++) {
  const address = addressPoints[i];
  const title = address[2];
  const marker = L.marker(new L.LatLng(address[0], address[1]), { title: title });
  marker.bindPopup(title);
  markers.addLayer(marker);
}

onMounted(() => {
  map = new L.Map(mapContent.value, {
    center: [-37.82, 175.24],
    zoom: 13,
  });

  L.tileLayer(osmUrl, {
    maxZoom: 19,
    attribution: attribution,
  }).addTo(map);

  map.addLayer(markers);
});
</script>
