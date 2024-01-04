import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [selectedDOSI, setSelectedDOSI] = useState("");
  const [selectedSIGUNGU, setSelectedSIGUNGU] = useState("");
  const navigate = useNavigate();

  const onClickHandler = (e) => {
    const endpoint =
      `/detailRegionPage?` +
      `dosi=${selectedDOSI}&` +
      `sigungu=${selectedSIGUNGU}`;
    navigate(endpoint);
  };

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
                    setSelectedDOSI(region[0]);
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
              <span style={{ fontSize: "20px" }}>{selectedDOSI}</span>
            </InputGroup.Text>
            {/* margin */}
            <DropdownButton as={ButtonGroup} size="lg" title="시/군/구">
              {selectedDOSI &&
                koreaRegion
                  .find((region) => region[0] === selectedDOSI)[1]
                  .map((city, idx) => (
                    <Dropdown.Item
                      key={idx}
                      onClick={() => {
                        setSelectedSIGUNGU(city);
                      }}
                    >
                      {city}
                    </Dropdown.Item>
                  ))}
            </DropdownButton>
            <InputGroup.Text id="basic-addon3" style={{ minWidth: "230px" }}>
              <span style={{ fontSize: "20px" }}>{selectedSIGUNGU}</span>
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
            onClick={onClickHandler}
          >
            Search
          </Button>{" "}
        </Card.Body>
      </Card>
    </div>
  );
}
