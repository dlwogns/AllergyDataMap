import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import "../styles/datacard.css";

const imageUrlsData = [
  {
    range: [0, 15],
    url: "https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg",
  },
  {
    range: [15, 30],
    url: "https://images.pexels.com/photos/326311/pexels-photo-326311.jpeg",
  },
  {
    range: [30, 45],
    url: "https://images.pexels.com/photos/414102/pexels-photo-414102.jpeg",
  },
  {
    range: [45, 60],
    url: "https://images.pexels.com/photos/340874/pexels-photo-340874.jpeg",
  },
  {
    range: [60, 75],
    url: "https://images.pexels.com/photos/199633/pexels-photo-199633.jpeg",
  },
  {
    range: [75, 90],
    url: "https://images.pexels.com/photos/199633/pexels-photo-199633.jpeg",
  },
  {
    range: [90, 105],
    url: "https://images.pexels.com/photos/199633/pexels-photo-199633.jpeg",
  },
  {
    range: [105, Infinity],
    url: "https://images.pexels.com/photos/199633/pexels-photo-199633.jpeg",
  },
];

export default function Datacard(props) {
  const [arr, setArr] = useState([]);
  const selectedRegion = useSelector(
    (state) => state.regionData.selectedRegion
  );

  useEffect(() => {
    if (selectedRegion) {
      const arrTemp = [
        { dataType: "미세먼지", value: selectedRegion.pm10value },
        { dataType: "꽃가루", value: selectedRegion.pm10value },
      ];

      for (let data of arrTemp) {
        for (let urlData of imageUrlsData) {
          if (data.value >= urlData.range[0] && data.value < urlData.range[1]) {
            data.url = urlData.url;
          }
        }
      }
      setArr(arrTemp);
    }
    console.log("!");
  }, [selectedRegion]);

  return (
    <Card className="data-card-container p-0 m-0">
      <Card.Body className="p-0">
        {arr.length > 0 && (
          <Container className="d-flex-column data-panel">
            <Container className="data-regionTitle-container">
              <Row className="">
                <Col className="d-flex justify-content-center">
                  <Card className="w-75 h-75 pt-4">
                    <Card.Title className="d-flex justify-content-center align-items-center">
                      {selectedRegion.SIG_KOR_NM}
                    </Card.Title>
                  </Card>
                </Col>
              </Row>
            </Container>
            <Container className="data-title-container">
              <Row className="d-flex justify-content-center align-items-center dataImgRow">
                {arr.map((data, index) => (
                  <Col key={index} className="d-flex justify-content-center">
                    <Card className="d-flex align-items-center">
                      <Card.Img className="dataImg" src={data.url} />
                      <Card.Body>
                        <Card.Title>{data.dataType}</Card.Title>
                        <Card.Text>농도: {data.value}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
            <Container className="data-content-container">
              <Row className="d-flex justify-content-center align-items-center dataImgRow">
                {arr.map((data, index) => (
                  <Col key={index} className="d-flex justify-content-center">
                    <Card className="d-flex align-items-center">
                      <Card.Body>
                        <Card.Title>주의사항</Card.Title>
                        <Card.Text>
                          여기엔 미세먼지랑 꽃가루 각각의 값에 따라 주의 사항
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </Container>
        )}
      </Card.Body>
    </Card>
  );
}
