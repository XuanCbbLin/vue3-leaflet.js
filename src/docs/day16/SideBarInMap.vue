<template>
  <div class="flex h-screen">
    <SideBar :travelList="travelList" @getPost="getPost" @moveMarker="moveMarker" />
    <Map :travelList="travelList" :marketLatLng="marketLatLng" />
  </div>
</template>

<script setup>
import Map from "./Map.vue";
import SideBar from "./SideBar.vue";
import { ref } from "vue";

const travelList = [
  {
    title: "City1",
    img: "https://picsum.photos/id/685/600/400",
    dsc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, accusantium? Repellat fugit architecto tenetur similique ipsa officia maxime nam quisquam, voluptatum nulla impedit atque dolores sapiente error tempora distinctio modi!",
    latLng: [24.98107885823501, 121.53625488281251],
    dom: null,
  },
  {
    title: "City2",
    img: "https://picsum.photos/id/686/600/400",
    dsc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, accusantium? Repellat fugit architecto tenetur similique ipsa officia maxime nam quisquam, voluptatum nulla impedit atque dolores sapiente error tempora distinctio modi!",
    latLng: [23.80042370237497, 120.41564941406251],
    dom: null,
  },
  {
    title: "City3",
    img: "https://picsum.photos/id/687/600/400",
    dsc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, accusantium? Repellat fugit architecto tenetur similique ipsa officia maxime nam quisquam, voluptatum nulla impedit atque dolores sapiente error tempora distinctio modi!",
    latLng: [22.32467096613322, 120.71777343750001],
    dom: null,
  },
  {
    title: "City4",
    img: "https://picsum.photos/id/688/600/400",
    dsc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, accusantium? Repellat fugit architecto tenetur similique ipsa officia maxime nam quisquam, voluptatum nulla impedit atque dolores sapiente error tempora distinctio modi!",
    latLng: [23.669681880942314, 121.42639160156251],
    dom: null,
  },
  {
    title: "City5",
    img: "https://picsum.photos/id/689/600/400",
    dsc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, accusantium? Repellat fugit architecto tenetur similique ipsa officia maxime nam quisquam, voluptatum nulla impedit atque dolores sapiente error tempora distinctio modi!",
    latLng: [23.79037129915711, 120.92102050781251],
    dom: null,
  },
];

const marketLatLng = ref({});

const getPost = (posts) => {
  travelList.forEach((travel, index) => {
    travel.dom = posts[index];
  });
};

const moveMarker = (post) => {
  marketLatLng.value = travelList.filter((travel) => travel.dom === post)[0];
};
</script>
