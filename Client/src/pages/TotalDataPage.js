import React, { useState, useEffect } from "react";
import Datacard from "../components/Datacard";
import Mapbox from "../components/Mapbox";
import "../styles/totaldatapage.css";
import Location from "../components/Location";
import { useSelector, useDispatch } from "react-redux";
import { getRegionData } from "../redux/regionDataSlice";
import axios from "axios";

export default function TotalDataPage() {
  const [selectedLocationData, setSelectedLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    axios("http://localhost:8000/getRegionData")
      .then((res) => {
        dispatch(getRegionData(res.data));
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="totaldatapage-container">
      {!isLoading && <Datacard />}
      {!isLoading && <Mapbox />}
      {/* <Location /> */}
    </div>
  );
}
