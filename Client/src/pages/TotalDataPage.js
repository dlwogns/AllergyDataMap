import React, { useState, useEffect } from "react";
import Datacard from "../components/Datacard";
import Mapbox from "../components/Mapbox";
import "../styles/totaldatapage.css";
import { useSelector, useDispatch } from "react-redux";
import { setRegionData } from "../redux/regionDataSlice";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Fade } from "reactstrap";

export default function TotalDataPage() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [selectedRegionData, setSelectedRegionData] = useState(null);
  const geojson = require("../geojson.json");
  const regions = useSelector((state) => state.regionData.regions);

  useEffect(() => {
    if (regions.length <= 0) {
      console.log(regions);
      axios("http://localhost:8000/getRegionData")
        .then((res) => {
          res.data.forEach((data1) => {
            geojson.features.forEach((data2) => {
              if (data1.cityName === data2.properties.SIG_KOR_NM) {
                data2.properties.pm10value = data1.pm10value;
                data2.properties.dataTime = data1.dataTime;
              }
            });
          });
          return dispatch(setRegionData(geojson));
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  return (
    <Container className="m-0 p-0 totaldatapage-container">
      <Row className="m-0 p-0 ">
        {selectedRegionData ? (
          <Col className="m-0 p-0">
            <Datacard selectedRegionData={selectedRegionData} />
          </Col>
        ) : (
          <Col className="m-0 p-0"></Col>
        )}
        {(!isLoading || (regions.features && regions.features.length > 0)) && (
          <Col className="m-0 p-0 mapbox-container">
            <Mapbox setSelectedRegionData={setSelectedRegionData} />
          </Col>
        )}
      </Row>
    </Container>
  );
}
