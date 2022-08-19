// 新增一個點座標
export const geojsonFeature = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [-104.96749877929689, 39.73887436009367],
  },
};

// options
// 設定style
export const myLines = [
  // 第一條線
  {
    type: "LineString",
    coordinates: [
      [-105.02500534057619, 39.73979836621592],
      [-105.01058578491212, 39.739666366099804],
    ],
  },
  // 第二條線
  {
    type: "LineString",
    coordinates: [
      [-105.01058578491212, 39.739666366099804],
      [-105.00251770019533, 39.7489057636298],
    ],
  },
];

export const myStyle = {
  color: "red",
  weight: 5,
  opacity: 0.65,
};

// options
// 設定style 傳入函示方式
export const states = [
  {
    type: "Feature",
    properties: { party: "Republican" },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-105.05281448364259, 39.750093596284245],
          [-105.03341674804689, 39.74956567318853],
          [-105.03393173217775, 39.732669998150385],
          [-105.05195617675783, 39.73689430525781],
          [-105.05281448364259, 39.750093596284245],
        ],
      ],
    },
  },
  {
    type: "Feature",
    properties: { party: "Democrat" },
    geometry: {
      type: "Polygon",
      coordinates: [
        [
          [-104.97024536132814, 39.749169728211825],
          [-104.95153427124025, 39.74930171012357],
          [-104.95256423950197, 39.732669998150385],
          [-104.9711036682129, 39.732669998150385],
          [-104.97024536132814, 39.749169728211825],
        ],
      ],
    },
  },
];

// pointToLayer
export const someGeojsonFeature = [
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [-104.99404, 39.75621],
    },
  },
  {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [-104.98404, 39.74621],
    },
  },
];

export const geojsonMarkerOptions = {
  radius: 8,
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

// onEachFeature
export const geojsonFeatureForEachFeature = {
  type: "Feature",
  properties: {
    name: "Coors Field",
    amenity: "Baseball Stadium",
    popupContent: "This is where the Rockies play!",
  },
  geometry: {
    type: "Point",
    coordinates: [-104.96749877929689, 39.73887436009367],
  },
};

export const onEachFeature = (feature, layer) => {
  if (feature.properties && feature.properties.popupContent) {
    layer.bindPopup(feature.properties.popupContent);
  }
};

// filter
export const someFeatures = [
  {
    type: "Feature",
    properties: {
      name: "Coors Field",
      show_on_map: true,
    },
    geometry: {
      type: "Point",
      coordinates: [-104.99404, 39.75621],
    },
  },
  {
    type: "Feature",
    properties: {
      name: "Busch Field",
      show_on_map: false,
    },
    geometry: {
      type: "Point",
      coordinates: [-104.98404, 39.74621],
    },
  },
];
