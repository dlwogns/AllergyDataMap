import React, { useState } from "react";
import Datacard from "../components/Datacard";
import Mapbox from "../components/Mapbox";
import "../styles/totaldatapage.css";

export default function TotalDataPage() {
  const [selectedLocation, setSelectedLocation] = useState({});

  return (
    <div className="totaldatapage-container">
      <Datacard selectedLocation={selectedLocation} />
      <Mapbox setSelectedLocation={setSelectedLocation} />
    </div>
  );
}
