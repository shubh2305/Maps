import React, { useState, useEffect } from "react";
import "./App.css";
import L from "leaflet";
import "leaflet-routing-machine";

import Map from "./components/Map.jsx";

import axios from "axios";

const secretKey = "b3d3bb517f71842ee1baafc71101c8da";

function App() {
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(19);
  const [longitude, setLongitude] = useState(75);
  const [startLocation, setStartLocation] = useState(
    "1300 Corregidor St NW, Washington, DC 20005, USA"
  );
  const [endLocation, setEndLocation] = useState(
    "San Francisco, CA 94102, USA"
  );
  const [start, setStart] = useState([38.9072, -77.036]);
  const [end, setEnd] = useState([37.7749, -122.4194]);

  const handleClick = (e) => {
    e.preventDefault();
    console.log(location);
    const url = `http://api.positionstack.com/v1/forward?access_key=${secretKey}&query=${location}`;
    axios.get(url).then((res) => {
      const locationData = res.data.data[0];
      console.log(res.data.data);
      setLatitude(locationData.latitude);
      setLongitude(locationData.longitude);
      setLocation(locationData.label);
      map.flyTo([locationData.latitude, locationData.longitude], 15, {
        duration: 2,
      });
    });
  };

  const handleFindRoute = (e) => {
    e.preventDefault();
    const startUrl = `http://api.positionstack.com/v1/forward?access_key=${secretKey}&query=${startLocation}`;
    const endUrl = `http://api.positionstack.com/v1/forward?access_key=${secretKey}&query=${endLocation}`;

    axios.get(startUrl).then((res) => {
      const locationData = res.data.data[0];
      let start1 = [locationData.latitude, locationData.longitude];
      setStart((prevState) => {
        return start1;
      });
    });

    axios.get(endUrl).then((res) => {
      const locationData = res.data.data[0];
      let end1 = [locationData.latitude, locationData.longitude];
      setEnd((prevState) => {
        return end1;
      });
    });

    console.log(start, end);
  };

  return (
    <div className="App">
      <div className="enter-location">
        <div className="input-wrapper">
          <input
            type="text"
            id="enter-location"
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search for a location"
            value={location}
          />
          <button className="btn" onClick={handleClick}>
            Search
          </button>
        </div>
      </div>
      <div className="enter-location">
        <form onSubmit={handleFindRoute} className="input-wrapper">
          <div className="start">
            <label htmlFor="">Enter source location: </label>
            <input
              id="enter-location"
              type="text"
              onChange={(e) => setStartLocation(e.target.value)}
              value={startLocation}
            />
          </div>
          <div className="end">
            <label htmlFor="">Enter destination location: </label>
            <input
              id="enter-location"
              type="text"
              onChange={(e) => setEndLocation(e.target.value)}
              value={endLocation}
            />
          </div>
          <button type="submit" className="btn">
            Find Route
          </button>
        </form>
      </div>
      <Map
        location={location}
        latitude={latitude}
        map={map}
        setMap={setMap}
        longitude={longitude}
        start={start}
        end={end}
      />
    </div>
  );
}

export default App;
