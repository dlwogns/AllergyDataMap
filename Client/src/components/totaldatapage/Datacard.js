import React from "react";
import Card from "react-bootstrap/Card";

export default function Datacard(props) {
  const getSelectedLocation = () => {
    if (
      props.selectedLocation !== undefined &&
      props.selectedLocation.properties
    ) {
      return props.selectedLocation.properties.CTP_KOR_NM;
    } else return "not korea area";
  };
  const sl = getSelectedLocation();

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{sl}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text></Card.Text>
      </Card.Body>
    </Card>
  );
}
