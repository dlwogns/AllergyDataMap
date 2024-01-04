import React, { useState, useEffect } from "react";
import Map, { Source, Layer } from "react-map-gl";
import type { FillLayer, LineLayer, HeatmapLayer } from "react-map-gl";
import { MAP_TOKEN } from "../config";
import "mapbox-gl/dist/mapbox-gl.css";
// import { mapData } from "../data";
import { fillColorData } from "../fillColorData";
import { useSelector, useDispatch } from "react-redux";

const geojson = require("../geojson.json");

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
    "fill-color": fillColorData,
    "fill-opacity": 0.5,
  },
};

function Mapbox(props) {
  const initialViewport = { latitude: 36, longitude: 127.8, zoom: 6.2 };
  const [viewport, setViewport] = useState(initialViewport);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const mapData = useSelector((state) => state.regionData.regions);

  const clickLayerHandler = (e) => {
    const feature = e.features[0] ? e.features[0].properties : "undefined";
    props.setSelectedRegionData(feature);
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
