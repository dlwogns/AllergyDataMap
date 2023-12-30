import React, { useEffect } from "react";
import Card from "react-bootstrap/Card";

export default function Datacard(props) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>
          {props.selectedLocationData.properties.CTP_KOR_NM}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <h1>pm10: {props.selectedLocationData.properties.pm10value}</h1>
        </Card.Subtitle>
        <Card.Text></Card.Text>
      </Card.Body>
    </Card>
  );
}
