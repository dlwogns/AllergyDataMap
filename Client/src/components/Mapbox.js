import React, { useRef, useState, useEffect } from "react";
import Map, { Source, Layer } from "react-map-gl";
import type { FillLayer, LineLayer, HeatmapLayer } from "react-map-gl";
import { MAP_TOKEN } from "../config";
import "mapbox-gl/dist/mapbox-gl.css";
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

// 호버되었을 때의 fillLayer 코드
const hoverFillLayer: FillLayer = {
  id: "hover_fill_layer",
  type: "fill",
  paint: {
    "fill-color": "rgba(255, 0, 0, 1)", // 빨간색으로 변경
    "fill-opacity": 0.75, // 투명도 조절
  },
  filter: ["==", "SIG_KOR_NM", ""], // 초기 필터 설정
};

// 전체 지도를 커버하는 레이어
const backgroundLayer = {
  id: "background",
  type: "background",
  paint: {
    "background-color": "rgba(230,230,230,1)", // 흐림 효과를 위한 배경색 설정
  },
};

function Mapbox(props) {
  const initialViewport = { latitude: 36, longitude: 127.8, zoom: 6.4 };
  const [viewport, setViewport] = useState(initialViewport);
  const [data, setData] = useState([]);
  const [hoveredRegion, setHoveredRegion] = useState("");
  const dispatch = useDispatch();
  const mapData = useSelector((state) => state.regionData.regions);

  const mapRef = useRef();
  const [map, setMap] = useState(null);

  const clickLayerHandler = (e) => {
    const feature = e.features[0] ? e.features[0].properties : "undefined";
    props.setSelectedRegionData(feature);
  };

  const onHoverHandler = (e) => {
    if (e.features[0]) {
      const regionName = e.features[0].properties.SIG_KOR_NM;
      if (regionName !== hoveredRegion) {
        console.log(regionName);
        setHoveredRegion(regionName);

        if (map) {
          const hoverLayer = map.getLayer("hover_fill_layer");
          if (hoverLayer) {
            map.setFilter("hover_fill_layer", ["==", "SIG_KOR_NM", regionName]);
          }
        }
      }
    }
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
      ref={mapRef}
      onLoad={() => setMap(mapRef.current.getMap())}
      mapboxAccessToken={MAP_TOKEN}
      initialViewState={viewport}
      style={{
        position: "absolute",
        left: "60%",
        width: "40vw",
        height: "92.9vh",
      }}
      mapStyle={"mapbox://styles/mapbox/light-v11"}
      onViewportChange={(viewport) => {
        setViewport(viewport);
      }}
      attributionControl={false}
      dragPan={false}
      scrollZoom={false}
      interactiveLayerIds={["my_fill_layer"]}
      onClick={clickLayerHandler}
      onMouseMove={onHoverHandler}
    >
      <Source type="geojson" data={geojson}>
        <Layer {...backgroundLayer}></Layer>
        <Layer {...fillLayer}></Layer>
        <Layer {...hoverFillLayer}></Layer>
      </Source>
      <Source type="geojson" data={geojson}>
        <Layer {...lineLayer}></Layer>
      </Source>
    </Map>
  );
}

export default Mapbox;
