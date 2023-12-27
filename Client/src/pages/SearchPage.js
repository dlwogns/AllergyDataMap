import React, { useEffect, useState } from "react";
import koreaRegion from "../koreaRegion";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import "../styles/searchPage.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SearchPage() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    for (let i = 0; i < koreaRegion.length; i++) {
      console.log(koreaRegion[i][0]);
      for (let j = 0; j < koreaRegion[i].length; j++) {
        console.log(koreaRegion[i][1][j]);
      }
    }
  }, []);

  return (
    <div className="searchContainer">
      <Card
        border="light"
        bg="dark"
        text="white"
        className="searchCard"
        style={{ width: "35rem", height: "20rem" }}
      >
        <Card.Header>Search</Card.Header>
        <Card.Body>
          <InputGroup className="mb-3">
            <DropdownButton as={ButtonGroup} size="md" title="시/도">
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
              style={{ marginRight: "50px", minWidth: "150px" }}
            >
              {selectedRegion}
            </InputGroup.Text>
            {/* margin */}
            <DropdownButton as={ButtonGroup} size="md" title="시/군/구">
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
            <InputGroup.Text id="basic-addon3" style={{ minWidth: "150px" }}>
              {selectedCity}
            </InputGroup.Text>
          </InputGroup>
          <Button
            variant="outline-success"
            style={{
              margin: "70px",
              marginLeft: "180px",
              width: "10em",
              height: "3em",
            }}
          >
            Search
          </Button>{" "}
        </Card.Body>
      </Card>
    </div>
  );
}
