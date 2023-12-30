import React, { useState } from "react";
import Datacard from "../components/Datacard";
import Mapbox from "../components/Mapbox";
import "../styles/totaldatapage.css";
import Location from "../components/Location";

export default function TotalDataPage() {
  const [selectedLocationData, setSelectedLocationData] = useState(null);

  return (
    <div className="totaldatapage-container">
      {selectedLocationData && (
        <Datacard selectedLocationData={selectedLocationData} />
      )}
      <Mapbox setSelectedLocationData={setSelectedLocationData} />
      {/* <Location /> */}
    </div>
  );
}
