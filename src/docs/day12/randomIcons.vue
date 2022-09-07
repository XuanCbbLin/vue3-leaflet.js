<template>
  <div class="flex">
    <!-- map -->
    <div class="w-full" ref="mapContent"></div>
    <!-- menu -->
    <ul class="w-[500px] h-[900px] overflow-y-scroll">
      <li
        class="px-2 py-3 text-center cursor-pointer hover:bg-gray-200"
        :class="{ 'bg-gray-200': currentCoordinate === coordinate }"
        v-for="coordinate in coordinateMenu"
        :key="coordinate"
        @click="moveMarker(coordinate)"
      >
        {{ `${coordinate.latitude} , ${coordinate.longtitude}` }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

let map = {};
const mapContent = ref(null);
const currentCoordinate = ref(null);
const coordinateMenu = reactive([]);
const markers = [];

const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

for (let i = 0; i < 20; i++) {
  coordinateMenu[i] = { latitude: getRandom(22, 25), longtitude: getRandom(120, 122) };
}

const moveMarker = (coordinate) => {
  currentCoordinate.value = coordinate;

  // 篩選點擊的 icon
  const filterMarker = markers.filter((marker) => {
    return (
      marker._latlng.lat === coordinate.latitude && marker._latlng.lng === coordinate.longtitude
    );
  });

  filterMarker[0].openPopup();
  map.flyTo([coordinate.latitude, coordinate.longtitude], 9);
};

onMounted(() => {
  map = L.map(mapContent.value).setView([23.695, 121.102], 8);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  coordinateMenu.forEach((coordinate, index) => {
    markers[index] = L.marker([coordinate.latitude, coordinate.longtitude]);

    markers[index].bindPopup(`${coordinate.latitude} , ${coordinate.longtitude}`).addTo(map);

    // 監聽 icon 並且篩選座標
    markers[index].addEventListener("click", (e) => {
      const filterMarker = coordinateMenu.filter((coordinate) => {
        return e.latlng.lat === coordinate.latitude && e.latlng.lng === coordinate.longtitude;
      });

      currentCoordinate.value = filterMarker[0];
      map.flyTo([e.latlng.lat, e.latlng.lng], 9);
    });
  });
});
</script>
