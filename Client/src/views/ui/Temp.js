import { useState, useEffect } from "react";
import Map, { Source, Layer } from "react-map-gl";
import type { FillLayer, LineLayer } from "react-map-gl";
import { MAP_TOKEN } from "../../config";
import "mapbox-gl/dist/mapbox-gl.css";
import type { HeatmapLayer } from "react-map-gl";

const MAX_ZOOM_LEVEL = 9;

const lineLayer: LineLayer = {
  id: "my_line_layer",
  type: "line",
  paint: {
    "line-color": "black",
  },
};

const heatmapLayer: HeatmapLayer = {
  id: "heatmap",
  maxzoom: MAX_ZOOM_LEVEL,
  type: "heatmap",
  paint: {
    "heatmap-weight": [
      "case",
      ["all", [">", ["get", "pm10value"], 0], ["<=", ["get", "pm10value"], 3]],
      0.2,
      ["all", [">", ["get", "pm10value"], 3], ["<=", ["get", "pm10value"], 6]],
      0.4,
      ["all", [">", ["get", "pm10value"], 6], ["<=", ["get", "pm10value"], 9]],
      0.6,
      [">", ["get", "pm10value"], 9],
      0.8,
      0,
    ],
    "heatmap-color": [
      "interpolate",
      ["linear"],
      ["heatmap-density"],
      0,
      "rgba(0,0,255,0)", // 파란색
      0.2,
      "rgb(0,255,0)", // 녹색
      0.4,
      "rgb(255,255,0)", // 노란색
      0.6,
      "rgb(255,165,0)", // 주황색
      0.8,
      "rgb(255,0,0)", // 빨간색
    ],
    // "heatmap-opacity": [
    //   "interpolate",
    //   ["linear"],
    //   ["heatmap-density"],
    //   0,
    //   0,
    //   0.2,
    //   0.5,
    //   0.4,
    //   0.7,
    //   0.6,
    //   0.8,
    //   0.8,
    //   1,
    // ],
    // ...기타 설정들...
  },
};

const geojson = require("../../geojson");
const datajson = require("../../geojson1");

function Temp(props) {
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

  useEffect(() => {
    /* global fetch */
    fetch("https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson")
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json);
      })
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  }, []);

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
        <Layer {...heatmapLayer}></Layer>
      </Source>
      <Source type="geojson" data={geojson}>
        <Layer {...lineLayer}></Layer>
      </Source>
    </Map>
  );
}

export default Temp;
