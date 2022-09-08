###### tags: `鐵人賽`

# day14 地圖上新增客製 icon 和內容

使用 bindPopup() 設定內容時就是塞 DOM 到 leaflet.js 建立的 .leaflet-popup-content 這個節點裡面，可以運用這個特性將想要設定的內容放進 bindPopup() 裡面。

## 功能介紹

1. 地圖新增客製的 icon
2. bindPopup() 放圖片和內容

## 實作

### 建立 icon

在 onMounted 階段建立客製的 icon，也新增內容放到地圖上。

customOptions : 設定 bindPopup 寬度
customPopup : bindPopup 要顯示的內容
icon :　初始化客製 icon

```javascript!

const customOptions = {
  minWidth: "300",
};

const customPopup = {
  img: '<img src="https://picsum.photos/id/700/600/400">',
  dsc: "<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>",
};


const icon = L.icon({
  iconUrl: "/src/assets/day14-icon/maps-and-flags.png",
  iconSize: [60, 60],
  iconAnchor: [30, 60],
  popupAnchor: [0, -60],
});


onMounted(() => {

  L.marker([23.58412603264412, 120.83038330078126], { icon })
    .bindPopup(`${customPopup.img}${customPopup.dsc}`, customOptions)
    .addTo(map)
    .openPopup();
});

```

完成範例:

![](https://i.imgur.com/vyw65jh.png)

程式碼範例:

https://github.com/XuanCbbLin/Vue3-leaflet/tree/master/src/components/CustomMarkerAndPopup

參考資料 :

https://leafletjs.com/reference-1.4.0.html#popup
https://leafletjs.com/reference-1.6.0.html#layer-bindpopup
