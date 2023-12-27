import React, { useState, useEffect } from "react";
import Map, { Source, Layer } from "react-map-gl";
import type { FillLayer, LineLayer, HeatmapLayer } from "react-map-gl";
import { MAP_TOKEN } from "../../config";
import "mapbox-gl/dist/mapbox-gl.css";
import * as turf from "@turf/turf";

const geojson = require("../../geojson");
const datajson = require("../../geojson1");

// const MAX_ZOOM_LEVEL = 9;

// const heatmapLayer: HeatmapLayer = {
//   id: "heatmap",
//   maxzoom: MAX_ZOOM_LEVEL,
//   type: "heatmap",
//   paint: {
//     "heatmap-radius": 1,
//     "heatmap-weight": [
//       "case",
//       ["all", [">", ["get", "pm10value"], 0], ["<=", ["get", "pm10value"], 3]],
//       0.2,
//       ["all", [">", ["get", "pm10value"], 3], ["<=", ["get", "pm10value"], 6]],
//       0.4,
//       ["all", [">", ["get", "pm10value"], 6], ["<=", ["get", "pm10value"], 9]],
//       0.6,
//       [">", ["get", "pm10value"], 9],
//       0.8,
//       0,
//     ],
//     "heatmap-color": [
//       "interpolate",
//       ["linear"],
//       ["heatmap-density"],
//       0,
//       "rgba(0,0,255,0)", // 파란색
//       0.2,
//       "rgb(0,255,0)", // 녹색
//       0.4,
//       "rgb(255,255,0)", // 노란색
//       0.6,
//       "rgb(255,165,0)", // 주황색
//       0.8,
//       "rgb(255,0,0)", // 빨간색
//     ],
//   },
// };

const lineLayer: LineLayer = {
  id: "my_line_layer",
  type: "line",
  paint: {
    "line-color": "black",
  },
};

// const fillLayer: FillLayer = {
//   id: "my_fill_layer",
//   type: "fill",
//   paint: {
//     "fill-color": "red",
//     "fill-opacity": 0.5,
//   },
// };

const fillLayer: FillLayer = {
  id: "my_fill_layer",
  type: "fill",
  paint: {
    "fill-color": [
      "case",
      ["all", [">", ["get", "pm10value"], 0], ["<=", ["get", "pm10value"], 3]],
      "blue",
      ["all", [">", ["get", "pm10value"], 3], ["<=", ["get", "pm10value"], 6]],
      "green",
      ["all", [">", ["get", "pm10value"], 6], ["<=", ["get", "pm10value"], 9]],
      "yellow",
      [">", ["get", "pm10value"], 9],
      "red",
      "gray", // 기본 색상
    ],
    "fill-opacity": 0.5,
  },
};

function Mapbox(props) {
  const initialViewport = { latitude: 36, longitude: 127.8, zoom: 6.2 };
  const [viewport, setViewport] = useState(initialViewport);

  const dragEndHandler = (e) => {
    console.log(e.viewState);
  };

  const clickLayerHandler = (e) => {
    const feature = e.features[0];
    props.setSelectedLocation(feature);
    console.log(feature);
  };

  return (
    <Map
      mapboxAccessToken={MAP_TOKEN}
      initialViewState={viewport}
      style={{
        position: "absolute",
        left: "60%",
        width: "40vw",
        height: "92.9vh",
      }}
      mapStyle="mapbox://styles/mapbox/light-v11"
      onViewportChange={(viewport) => {
        setViewport(viewport);
      }}
      attributionControl={false}
      dragPan={false}
      onDragEnd={dragEndHandler}
      scrollZoom={false}
      interactiveLayerIds={["my_fill_layer"]}
      onClick={clickLayerHandler}
    >
      <Source type="geojson" data={datajson}>
        <Layer {...fillLayer}></Layer>
      </Source>
      <Source type="geojson" data={geojson}>
        <Layer {...lineLayer}></Layer>
      </Source>
    </Map>
  );
}

export default Mapbox;
