import React, { useRef, useState, useEffect } from "react";
import Map, { Source, Layer } from "react-map-gl";
import type { FillLayer, LineLayer, HeatmapLayer } from "react-map-gl";
import { MAP_TOKEN } from "../config";
import "mapbox-gl/dist/mapbox-gl.css";
import { fillColorData } from "../fillColorData";
import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import "../styles/mapbox.css";

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
  const lat = 36;
  const lon = 127.8;
  const initialViewport = {
    latitude: lat,
    longitude: lon,
    zoom: 6.4,
    minZoom: 6.4,
    maxZoom: 10,
  };
  const [viewport, setViewport] = useState(initialViewport);
  const [hoveredRegion, setHoveredRegion] = useState("");
  const [isZoomMin, setIsZoomMin] = useState(false);

  const mapRef = useRef();
  const [map, setMap] = useState(null);

  const viewportChangeHandler = (e) => {
    setViewport(e);
  };

  const clickLayerHandler = (e) => {
    const feature = e.features[0] ? e.features[0].properties : "undefined";
    props.setSelectedRegionData(feature);
  };

  const onHoverHandler = (e) => {
    if (e.features[0]) {
      const regionName = e.features[0].properties.SIG_KOR_NM;
      if (regionName !== hoveredRegion) {
        // console.log(regionName);
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

  const onZoomEndHandler = (e) => {
    if (e.viewState.zoom <= 6.41) {
      setIsZoomMin(true);
    }
  };

  const resetMapViewport = (e) => {
    map.flyTo({ center: [lon, lat], zoom: 6.4 });
  };

  useEffect(() => {
    if (isZoomMin && map) {
      resetMapViewport();
      setIsZoomMin(false);
    }
  }, [isZoomMin]);

  useEffect(() => {
    if (mapRef.current) {
      setMap(mapRef.current.getMap());
    }
  }, []);

  return (
    <Map
      ref={mapRef}
      onLoad={() => setMap(mapRef.current.getMap())}
      mapboxAccessToken={MAP_TOKEN}
      initialViewState={viewport}
      mapStyle={"mapbox://styles/mapbox/light-v11"}
      onViewportChange={viewportChangeHandler}
      attributionControl={false}
      dragPan={false}
      interactiveLayerIds={["my_fill_layer"]}
      onClick={clickLayerHandler}
      onMouseMove={onHoverHandler}
      onZoomEnd={onZoomEndHandler}
    >
      {hoveredRegion && (
        <Card
          className="mapbox-hovered-card"
          style={{
            width: "6rem",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        >
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>{hoveredRegion}</Card.Title>
            <Card.Text></Card.Text>
          </Card.Body>
        </Card>
      )}
      <Source type="geojson" data={geojson}>
        <Layer {...backgroundLayer}></Layer>
        <Layer {...fillLayer}></Layer>
        <Layer {...hoverFillLayer}></Layer>
      </Source>
      <Source type="geojson" data={geojson}>
        <Layer {...lineLayer}></Layer>
      </Source>

      <div className="riskInfoCard">
        <h4>위험지수</h4>
        <p>
          <span style={{ color: "green" }}>●</span> 낮음
        </p>
        <p>
          <span style={{ color: "yellow" }}>●</span> 중간
        </p>
        <p>
          <span style={{ color: "red" }}>●</span> 높음
        </p>
      </div>
    </Map>
  );
}

export default Mapbox;
