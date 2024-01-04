import React, { useState, useEffect } from "react";
import Datacard from "../components/Datacard";
import Mapbox from "../components/Mapbox";
import "../styles/totaldatapage.css";
import { useSelector, useDispatch } from "react-redux";
import { getRegionData } from "../redux/regionDataSlice";
import axios from "axios";

export default function TotalDataPage() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const [selectedRegionData, setSelectedRegionData] = useState(null);
  const arr = [];
  const geojson = require("../geojson.json");

  useEffect(() => {
    axios("http://localhost:8000/getRegionData")
      .then((res) => {
        res.data.map((region) => {
          const res2 = geojson.features.find(
            (target) => target.properties.SIG_KOR_NM === region.cityName
          );
          if (res2) {
            const tmp = res2;
            tmp.properties.pm10value = region.pm10value;
            tmp.properties.dataTime = region.dataTime;
            arr.push(tmp);
          } else console.log(region, "!");
        });
        return dispatch(getRegionData(arr));
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
      {arr && <Mapbox setSelectedRegionData={setSelectedRegionData} />}
    </div>
  );
}
