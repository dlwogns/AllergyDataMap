import React, { useEffect, useState } from "react";
import koreaRegion from "../koreaRegion";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SearchPage() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    setSelectedCity("");
  }, [selectedRegion]);

  return (
    <div
      className="searchContainer"
      style={{ margin: "100px", marginLeft: "240px" }}
    >
      <Card
        border="light"
        bg="dark"
        text="white"
        className="searchCard"
        style={{ width: "50em", height: "25em" }}
      >
        <Card.Header>Search</Card.Header>
        <Card.Body>
          <InputGroup className="mb-5" style={{ marginLeft: "15px" }}>
            <DropdownButton as={ButtonGroup} size="lg" title="시/도">
              {koreaRegion.map((region, idx) => (
                <Dropdown.Item
                  key={idx}
                  onClick={() => {
                    setSelectedRegion(region[0]);
                  }}
                >
                  {region[0]}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            <InputGroup.Text
              id="basic-addon3"
              style={{ marginRight: "50px", minWidth: "230px" }}
            >
              <span style={{ fontSize: "20px" }}>{selectedRegion}</span>
            </InputGroup.Text>
            {/* margin */}
            <DropdownButton as={ButtonGroup} size="lg" title="시/군/구">
              {selectedRegion &&
                koreaRegion
                  .find((region) => region[0] === selectedRegion)[1]
                  .map((city, idx) => (
                    <Dropdown.Item
                      key={idx}
                      onClick={() => {
                        setSelectedCity(city);
                      }}
                    >
                      {city}
                    </Dropdown.Item>
                  ))}
            </DropdownButton>
            <InputGroup.Text id="basic-addon3" style={{ minWidth: "230px" }}>
              <span style={{ fontSize: "20px" }}>{selectedCity}</span>
            </InputGroup.Text>
          </InputGroup>
          <Button
            variant="outline-success"
            style={{
              marginTop: "100px",
              marginLeft: "230px",
              width: "20em",
              height: "4em",
            }}
          >
            Search
          </Button>{" "}
        </Card.Body>
      </Card>
    </div>
  );
}
