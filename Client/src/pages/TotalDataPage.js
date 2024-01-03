import React, { useState, useEffect } from "react";
import Datacard from "../components/Datacard";
import Mapbox from "../components/Mapbox";
import "../styles/totaldatapage.css";
import Location from "../components/Location";
import { useSelector, useDispatch } from "react-redux";
import { getRegionData } from "../redux/regionDataSlice";
import axios from "axios";

export default function TotalDataPage() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [selectedRegionData, setSelectedRegionData] = useState(null);

  useEffect(() => {
    axios("http://localhost:8000/getRegionData")
      .then((res) => {
        dispatch(getRegionData(res.data));
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(selectedRegionData);
  }, [selectedRegionData]);

  return (
    <div className="totaldatapage-container">
      {selectedRegionData && (
        <Datacard selectedRegionData={selectedRegionData} />
      )}
      {!isLoading && <Mapbox setSelectedRegionData={setSelectedRegionData} />}
      {/* <Location /> */}
    </div>
  );
}
