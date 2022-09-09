###### tags: `鐵人賽`

# day16 選單內容捲動移動地圖

今天要來實作透過 IntersectionObserver 監聽選單內容移動到可視範圍，控制地圖移到該區塊。

## 實作

1. 引入選單元件
   SideBarInMap 引入 SideBar 元件。

```javascript!
<SideBar :travelList="travelList" @getPost="getPost" @moveMarker="moveMarker" />
```

travelList : 選單內容
getPost : 取得可視範圍的文章

```javascript!

const travelList = [
  {
    title: "City1",
    img: "https://picsum.photos/id/685/600/400",
    dsc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    latLng: [24.98107885823501, 121.53625488281251],
    dom: null,
  },
    ... 略
];

const getPost = (posts) => {
  travelList.forEach((travel, index) => {
    travel.dom = posts[index];
  });
};

```

2. 選單元件使用 IntersectionObserver 偵測可視範圍

- 建立 IntersectionObserver 分別設定 callback 和 option 監聽選單內文章。
- 選單在 onMounted 階段將節點傳到 SideBarInMap 元件。

```javascript!

const emit = defineEmits(["getPost", "moveMarker"]);

const callback = (entry) => {
  entry.forEach((bound) => {
    if (bound.intersectionRatio === 1) {
      emit("moveMarker", bound.target);
    }
  });
};

const option = {
  threshold: [1],
};
const observer = new IntersectionObserver(callback, option);

onMounted(() => {
  emit("getPost", postDoms.value);

  let i = 0;
  imgs.value.forEach((item) => {
    const img = new Image();
    img.src = item.src;

    img.addEventListener("load", () => {
      i += 1;
      if (imgs.value.length === i) {
        postDoms.value.forEach((dom) => {
          observer.observe(dom);
        });
      }
    });
  });
});
```

3. map 元件 watch props.marketLatLng 控制地圖移動到設定的經緯度。

```javascript!
const props = defineProps({
  travelList: Array,
  marketLatLng: Object,
});


watch(
  () => props.marketLatLng,
  (newMarker) => {
    map.flyTo(newMarker.latLng, 11);
  }
);

```

完成範例
![](https://i.imgur.com/bmVAabe.jpg)

程式碼 :
https://github.com/XuanCbbLin/Vue3-leaflet/tree/master/src/components/SideBarInMap
