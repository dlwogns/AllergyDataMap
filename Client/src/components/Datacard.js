import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";
import { useSelector, useDispatch } from "react-redux";

export default function Datacard(props) {
  const regionData = useSelector((state) => state.selectedRegionData);
  useEffect(() => {}, []);
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{props.selectedRegionData.CTP_KOR_NM}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <h1>pm10: {props.selectedRegionData.pm10value}</h1>
        </Card.Subtitle>
        <Card.Text></Card.Text>
      </Card.Body>
    </Card>
  );
}
