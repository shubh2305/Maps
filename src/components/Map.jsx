import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

import RoutingMachine from "./RoutingControl";

const Map = ({ location, latitude, map, setMap, longitude, start, end }) => {
  const rMachine = useRef();
  const [show, setShow] = useState(false);
  const points = [start, end];
  let directionContainer = document.getElementsByClassName(
    "leaflet-routing-container"
  )[0];
  useEffect(() => {
    if (rMachine.current) {
      console.log(rMachine.current);
      rMachine.current.setWaypoints(points);
    }
  }, [points, rMachine]);

  if (directionContainer)
    directionContainer.style.display = show ? "block" : "none";
  return (
    <MapContainer
      whenCreated={(map) => setMap(map)}
      center={[latitude, longitude]}
      zoom={5}
      scrollWheelZoom={true}
    >
      <RoutingMachine ref={rMachine} orders={points} map={map}></RoutingMachine>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.mapbox.com/styles/v1/joseph-1729/cksaldz91546o17p4mr2mkw2h/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoiam9zZXBoLTE3MjkiLCJhIjoiY2tydnYxb3dpMDY2dzMxbWtjZ2x2anZtMCJ9.BzIc85IzipAfY-tOXFwBYw"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>{location}</Popup>
      </Marker>

      <div
        className="leaflet-routing-container close"
        onClick={() => setShow(!show)}
      >
        <h2>{show ? "Close" : "Show"} Directions</h2>
      </div>
    </MapContainer>
  );
};

export default Map;
