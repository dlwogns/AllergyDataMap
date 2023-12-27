import React, { useState } from "react";
import Datacard from "../../components/totaldatapage/Datacard";
import Mapbox from "../../components/totaldatapage/Mapbox";
import "../../components/totaldatapage/totaldatapage.css";

export default function TotalDataPage() {
  const [selectedLocation, setSelectedLocation] = useState({});

  return (
    <div className="totaldatapage-container">
      <Datacard selectedLocation={selectedLocation} />
      <Mapbox setSelectedLocation={setSelectedLocation} />
    </div>
  );
}
