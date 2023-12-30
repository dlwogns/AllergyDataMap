import React, { useState, useEffect } from "react";
import Map, { Source, Layer } from "react-map-gl";
import type { FillLayer, LineLayer, HeatmapLayer } from "react-map-gl";
import { MAP_TOKEN } from "../config";
import "mapbox-gl/dist/mapbox-gl.css";
import { mapData } from "../data";

const geojson = require("../output");

const lineLayer: LineLayer = {
  id: "my_line_layer",
  type: "line",
  paint: {
    "line-color": "black",
  },
};

const fillLayer: FillLayer = {
  id: "my_fill_layer",
  type: "fill",
  paint: {
    "fill-color": "red",
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
  const [data, setData] = useState([]);

  const dragEndHandler = (e) => {
    console.log(e.viewState);
  };

  const clickLayerHandler = (e) => {
    const feature = e.features[0];
    props.setSelectedLocationData(feature);
    console.log(feature);
  };

  useEffect(() => {
    mapData.forEach((data1) => {
      geojson.features.forEach((data2) => {
        if (data1.cityName === data2.properties.SIG_KOR_NM) {
          data2.properties.pm10value = data1.pm10value;
        }
      });
    });
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
      <Source type="geojson" data={geojson}>
        <Layer {...fillLayer}></Layer>
      </Source>
      <Source type="geojson" data={geojson}>
        <Layer {...lineLayer}></Layer>
      </Source>
    </Map>
  );
}

export default Mapbox;
