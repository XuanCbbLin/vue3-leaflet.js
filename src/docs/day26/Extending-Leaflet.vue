<template>
  <!-- map -->
  <div class="h-[100vh]" ref="mapContent"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.polyline.snakeanim/L.Polyline.SnakeAnim";

let map = {};
const mapContent = ref(null);

const osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

// const MyDemoClass = L.Class.extend({
//   myDemoProperty: 42,
// });

// MyDemoClass.include({
//   // Adding a new property to the class
//   newProperty: 78,
// });

// const mySecondDemoInstance = new MyDemoClass();

// // This will output "78"
// console.log(mySecondDemoInstance.newProperty);

const MyBoxClass = L.Class.extend({
  options: {
    width: 1,
    height: 1,
  },

  initialize: function (name, options) {
    this.name = name;
    L.setOptions(this, options);
  },
});

var instance = new MyBoxClass("Red", { width: 10 });

console.log(instance.name); // Outputs "Red"
console.log(instance.options.width); // Outputs "10"
console.log(instance.options.height); // Outputs "1", the default

onMounted(() => {
  map = new L.Map(mapContent.value, {
    center: [23.695, 121.102],
    zoom: 8,
  });

  L.tileLayer(osmUrl, {
    maxZoom: 19,
    attribution: attribution,
  }).addTo(map);
});
</script>
