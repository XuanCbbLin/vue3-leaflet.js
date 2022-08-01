# Leaflet.js 介紹和起手式

## Leaflet.js 是什麼

Leaflet 是一個開源的函式庫,大小只有 42kB,能夠實現基本的地圖操作,建立圖層,標記,彈出窗口,縮放等操作

## Leaflet.js 怎麼導入

1. CDN 引入

 <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" integrity="sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ==" crossorigin="" />
<script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js" integrity="sha512-BB3hKbKWOc9Ez/TAwyWxNXeoV9c1v6FIeYiBieIWkpLjauysF18NzgR1MBNBXf8/KABdlkX68nAhlwcDFLGPCQ==" crossorigin=""></script>

2. 直接下載再引入檔案

官網載點 https://leafletjs.com/download.html

![alt](../../../day1/%E4%B8%8B%E8%BC%89leafletjs.png)

<link rel="stylesheet" href="/path/to/leaflet.css" />
<script src="/path/to/leaflet.js"></script>

3. 下載至 package.json

終端機執行 npm install leaflet

這時候看 package.json 的 dependencies 就會有東西了

"dependencies": {
"leaflet": "^1.8.0",
},
