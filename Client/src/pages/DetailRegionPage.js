import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import QueryString from "qs";
import Map, { Source, Layer } from "react-map-gl";
import type { FillLayer, LineLayer, HeatmapLayer } from "react-map-gl";
import { MAP_TOKEN } from "../config";
import "mapbox-gl/dist/mapbox-gl.css";
import { fillColorData } from "../fillColorData";
import Card from "react-bootstrap/Card";

export default function DetailRegionPage() {
  const location = useLocation();
  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const initialViewport = { latitude: 36, longitude: 127.8, zoom: 6.2 };
  const [viewport, setViewport] = useState(initialViewport);
  const [searchedRegionFeature, setSearchedRegionFeature] = useState();
  const regions = useSelector((state) => state.regionData.regions);
  const geoJson = require("../geojson.json");

  useEffect(() => {
    console.log(regions);
    const newFeature = regions.features.find(
      (region_feature) =>
        region_feature.properties.SIG_KOR_NM.split(" ")[1] ===
        `${queryData.sigungu}`
    );

    setSearchedRegionFeature(newFeature);
  }, []);

  const lineLayer: LineLayer = {
    id: "my_line_layer",
    type: "line",
    paint: {
      "line-color": "black",
      "line-opacity": 0.2,
    },
  };

  const fillLayer: FillLayer = {
    id: "my_fill_layer",
    type: "fill",
    paint: {
      "fill-color": fillColorData,
      "fill-opacity": 1,
    },
  };

  // 전체 지도를 커버하는 레이어
  const backgroundLayer = {
    id: "background",
    type: "background",
    paint: {
      "background-color": "rgba(230,230,230,1)", // 흐림 효과를 위한 배경색 설정
    },
  };

  return (
    <div style={{ display: "grid" }}>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>
            {queryData.dosi} {queryData.sigungu}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">DATA</Card.Subtitle>
          {searchedRegionFeature && (
            <Card.Text>
              <h1>pm10: {searchedRegionFeature.properties.pm10value}</h1>
              <h1>dataTime: {searchedRegionFeature.properties.dataTime}</h1>
            </Card.Text>
          )}
        </Card.Body>
      </Card>
      {searchedRegionFeature && (
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
          // onDragEnd={dragEndHandler}
          scrollZoom={false}
          interactiveLayerIds={["my_fill_layer"]}
        >
          <Source type="geojson" data={searchedRegionFeature}>
            <Layer {...backgroundLayer}></Layer>
            <Layer {...fillLayer}></Layer>
          </Source>
          <Source type="geojson" data={geoJson}>
            {/* <Layer {...backgroundLayer}></Layer> */}
            <Layer {...lineLayer}></Layer>
          </Source>
        </Map>
      )}
    </div>
  );
}
