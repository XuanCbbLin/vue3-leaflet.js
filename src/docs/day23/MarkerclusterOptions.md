###### tags: `鐵人賽`

# day22 markercluster Options

今天要介紹 markercluster 套件其他設定

```javascript!
const markers = L.markerClusterGroup({
  spiderfyOnMaxZoom: false,
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

```

- spiderfyOnMaxZoom : 設定地圖縮小最大時 marker 是否還會呈現蜘蛛網形式
  預設 true 點擊 marker 就會散開
  ![](https://i.imgur.com/oG8U19e.png)

![](https://i.imgur.com/Bd1eT7E.png)

設定 false 就不會散開

- zoomToBoundsOnClick : 點擊 marker 時是否會散開
- spiderLegPolylineOptions : 設定 marker 散開的 Polyline 顏色、寬度等樣式
  ![](https://i.imgur.com/QkG0CB0.png)
- iconCreateFunction : 客製化 marker 群組時的狀態

## 參考資料

https://github.com/Leaflet/Leaflet.markercluster#options
