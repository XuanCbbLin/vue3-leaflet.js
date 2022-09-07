# day12 地圖產生多個 Icon

前面幾天講解了 Leaflet.js 一些基本的設定，之後要將前面介紹的內容做一些小
範例。

## 地圖上產生多個 icon 功能介紹

1. 亂數產生 icon
2. 點擊座標選單或 icon 移動到對應的位置，並且顯示 popup

### 實作

1. 建立地圖物件和圖資

```javascript!
 <div class="w-full" ref="mapContent"></div>
```

```javascript!

<script setup>

let map = {};
 const mapContent = ref(null);

onMounted(() => {
  map = L.map(mapContent.value).setView([23.695, 121.102], 8);
   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

}


</script>
```

2. 設定亂數函式和選單
   圖資設定在台灣，並且使用亂數在北緯 22~25 和東經 120~122 之間建立選單。

currentCoordinate : 紀錄亂數座標的選單
getRandom : 亂數函式

```javascript!

  <ul class="w-[500px] h-[900px] overflow-y-scroll">
      <li
        class="px-2 py-3 text-center cursor-pointer hover:bg-gray-200"
        v-for="coordinate in coordinateMenu"
        :key="coordinate"
      >
        {{ `${coordinate.latitude} , ${coordinate.longtitude}` }}
      </li>
  </ul>

```

```javascript!

const currentCoordinate = ref(null);

const getRandom = (min, max) => {
  return Math.random() * (max - min) + min;
};

for (let i = 0; i < 20; i++) {
  coordinateMenu[i] = { latitude: getRandom(22, 25), longtitude: getRandom(120, 122) };
}

```

選單
![](https://i.imgur.com/FKWZici.png)

3. 地圖上產生座標
   在 onMounted 階段時將剛剛選單的資料透過迴圈產生到地圖上，並且設定 bindPopup 顯示位置。

markers : 20 筆 icon 的資料

```javascript!

const markers = [];

onMounted(() => {
  coordinateMenu.forEach((coordinate, index) => {
    markers[index] = L.marker([coordinate.latitude, coordinate.longtitude]);

    markers[index].bindPopup(`${coordinate.latitude} , ${coordinate.longtitude}`).addTo(map);

    });
  });
});


```

地圖上的座標
![](https://i.imgur.com/Tw5fvU1.png)

4. 監聽選單座標，點擊時移動到 icon 的位置
   點擊選單的某個座標時使用 flyTo() 動畫的移動的指定座標，並且用 openPopup() 將一開始綁在座標上的座標訊息。

```javascript!

<ul class="w-[500px] h-[900px] overflow-y-scroll">
    <li v-for="coordinate in coordinateMenu"
        :key="coordinate"
        :class="{ 'bg-gray-200': currentCoordinate === coordinate }"
        @click="moveMarker(coordinate)">
    </li>
</ul>

```

currentCoordinate : 當點擊地圖上的 icon 或選單上的座標紀錄目前座標，修改選單樣式
moveMarker : 移動到點擊的 icon

```javascript!

const currentCoordinate = ref(null);

const moveMarker = (coordinate) => {
  currentCoordinate.value = coordinate;

  const filterMarker = markers.filter((marker) => {
    return marker._latlng.lat === coordinate.latitude && marker._latlng.lng === coordinate.longtitude ;
  });

  filterMarker[0].openPopup();
  map.flyTo([coordinate.latitude, coordinate.longtitude], 9);
};

```

5. 點擊 icon 移動到該座標
   在 20 個 icon 監聽 click 事件，篩選監聽的座標也是用 flyTo() 做出動畫的移動效果。

```javascript!

onMounted(() => {

  coordinateMenu.forEach((coordinate, index) => {
    markers[index].addEventListener("click", (e) => {
      const filterMarker = coordinateMenu.filter((coordinate) => {
        return e.latlng.lat === coordinate.latitude && e.latlng.lng === coordinate.longtitude;
      });

      currentCoordinate.value = filterMarker[0];
      map.flyTo([e.latlng.lat, e.latlng.lng], 9);
    });
  });

});

```

完成範例
![](https://i.imgur.com/eoyzQuO.png)
