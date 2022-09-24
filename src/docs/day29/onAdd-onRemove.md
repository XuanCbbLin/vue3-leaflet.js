###### tags: `鐵人賽`

# day29 Extending Leaflet onAdd 和 onRemove

此篇要介紹建立圖層和移動圖層時的架構

## onAdd 和 onRemove

- onAdd() : 建立圖層
- onRemove() : 移動圖層時會啟動移除的函式
- \_update : 移動到新圖層時觸發

```javascript!
L.CustomLayer = L.Layer.extend({
    onAdd: function(map) {},

    onRemove: function(map) {},

    _update: function() {}
});

```

## 參考資料 1231321

https://leafletjs.com/examples/extending/extending-2-layers.html
