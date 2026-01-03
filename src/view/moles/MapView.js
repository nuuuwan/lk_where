import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import { useEffect, useMemo } from "react";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const TargetCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  pointer-events: none;
  z-index: 1000;
  border: 3px solid #000;
  border-radius: 50%;

  &::before {
    content: "";
    position: absolute;
    width: 50px;
    height: 50px;
    border: 2px solid #000;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #000;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

function MapUpdater() {
  useMapEvents({
    moveend: (e) => {
      const center = e.target.getCenter();
      const lat = center.lat.toFixed(4);
      const lng = center.lng.toFixed(4);
      document.title = `${lat}°N, ${lng}°E`;
    },
  });
  return null;
}

function MapView() {
  const position = useMemo(() => [6.9271, 80.7789], []); // Center of Sri Lanka

  useEffect(() => {
    const lat = position[0].toFixed(4);
    const lng = position[1].toFixed(4);
    document.title = `${lat}°N, ${lng}°E`;
  }, [position]);

  return (
    <MapWrapper>
      <TargetCircle />
      <MapContainer
        center={position}
        zoom={8}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater />
      </MapContainer>
    </MapWrapper>
  );
}

export default MapView;
