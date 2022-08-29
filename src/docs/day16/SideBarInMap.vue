<template>
  <div class="flex h-screen">
    <SideBar />
    <Map />
  </div>
</template>

<script setup>
import { provide } from "vue";
import Map from "./Map.vue";
import SideBar from "./SideBar.vue";

const travelList = [
  {
    title: "City1",
    img: "https://picsum.photos/id/685/600/400",
    dsc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, accusantium? Repellat fugit architecto tenetur similique ipsa officia maxime nam quisquam, voluptatum nulla impedit atque dolores sapiente error tempora distinctio modi!",
    latLng: [24.98107885823501, 121.53625488281251],
  },
  {
    title: "City2",
    img: "https://picsum.photos/id/686/600/400",
    dsc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, accusantium? Repellat fugit architecto tenetur similique ipsa officia maxime nam quisquam, voluptatum nulla impedit atque dolores sapiente error tempora distinctio modi!",
    latLng: [23.80042370237497, 120.41564941406251],
  },
  {
    title: "City3",
    img: "https://picsum.photos/id/687/600/400",
    dsc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, accusantium? Repellat fugit architecto tenetur similique ipsa officia maxime nam quisquam, voluptatum nulla impedit atque dolores sapiente error tempora distinctio modi!",
    latLng: [22.32467096613322, 120.71777343750001],
  },
  {
    title: "City4",
    img: "https://picsum.photos/id/688/600/400",
    dsc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, accusantium? Repellat fugit architecto tenetur similique ipsa officia maxime nam quisquam, voluptatum nulla impedit atque dolores sapiente error tempora distinctio modi!",
    latLng: [23.669681880942314, 121.42639160156251],
  },
];

provide("travelList", travelList);
</script>
