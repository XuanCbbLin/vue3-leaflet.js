<template>
  <div class="flex h-screen">
    <SideBar :travelList="travelList" />
    <Map />
  </div>
</template>

<script setup>
import Map from "./Map.vue";
import SideBar from "./SideBar.vue";

const travelList = [
  {
    title: "City1",
    img: "https://picsum.photos/id/685/600/400",
    dsc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, accusantium? Repellat fugit architecto tenetur similique ipsa officia maxime nam quisquam, voluptatum nulla impedit atque dolores sapiente error tempora distinctio modi!",
  },
  {
    title: "City2",
    img: "https://picsum.photos/id/686/600/400",
    dsc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, accusantium? Repellat fugit architecto tenetur similique ipsa officia maxime nam quisquam, voluptatum nulla impedit atque dolores sapiente error tempora distinctio modi!",
  },
  {
    title: "City3",
    img: "https://picsum.photos/id/687/600/400",
    dsc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, accusantium? Repellat fugit architecto tenetur similique ipsa officia maxime nam quisquam, voluptatum nulla impedit atque dolores sapiente error tempora distinctio modi!",
  },
  {
    title: "City4",
    img: "https://picsum.photos/id/688/600/400",
    dsc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, accusantium? Repellat fugit architecto tenetur similique ipsa officia maxime nam quisquam, voluptatum nulla impedit atque dolores sapiente error tempora distinctio modi!",
  },
];
</script>
