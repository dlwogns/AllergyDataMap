import React, { useState, useEffect } from "react";
import Datacard from "../components/Datacard";
import Mapbox from "../components/Mapbox";
import "../styles/totaldatapage.css";
import { useSelector, useDispatch } from "react-redux";
import { setRegionData } from "../redux/regionDataSlice";
import axios from "axios";

export default function TotalDataPage() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [selectedRegionData, setSelectedRegionData] = useState(null);
  const geojson = require("../geojson.json");

  useEffect(() => {
    axios("http://localhost:8000/getRegionData")
      .then((res) => {
        dispatch(setRegionData(res.data));
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [selectedRegionData]);

  return (
    <div className="totaldatapage-container">
      {selectedRegionData && (
        <Datacard selectedRegionData={selectedRegionData} />
      )}
      {!isLoading && <Mapbox setSelectedRegionData={setSelectedRegionData} />}
    </div>
  );
}
