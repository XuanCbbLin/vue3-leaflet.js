###### tags: `鐵人賽`

# day23 markercluster 事件

marker 除了能群組設定 option 還能監聽事件。

```javascript!
markers.on("click", function (e) {
  // console.log(e.layer);
});

markers.on("clusterclick", function (e) {
  console.log("cluster " + e.layer.getAllChildMarkers().length);
});

markers.on("animationend", (e) => {
  // console.log(e);
});

markers.on("spiderfied", (e) => {
  // console.log(e);
});

markers.on("unspiderfied", (e) => {
  // console.log(e);
});

```

- clusterclick 事件: 監聽 marker 群組
- animationend :　 marker 群組點擊結束動畫後觸發
- spiderfied : marker 群組散開時觸發
- unspiderfied : marker 群組收合後觸發

參考資料:https://github.com/Leaflet/Leaflet.markercluster#events
