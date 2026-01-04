import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import styled from "styled-components";
import L from "leaflet";
import MapUpdater from "./MapUpdater";

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

// Create custom red icon for guessed location
const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Create custom green icon for actual location
const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function GameMap({
  position,
  currentCity,
  isGuessed,
  guessedLocation,
  distance,
  onMapMove,
}) {
  return (
    <MapWrapper>
      <MapContainer
        center={position}
        zoom={8}
        scrollWheelZoom={true}
        zoomControl={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/stamen_terrain_background/{z}/{x}/{y}{r}.png"
          minZoom={7}
          maxZoom={10}
        />
        {/* Show guessed location marker in red after guess */}
        {isGuessed && guessedLocation && (
          <Marker position={guessedLocation} icon={redIcon}>
            <Popup>Your Guess</Popup>
          </Marker>
        )}
        {/* Show actual location marker in green after guess */}
        {isGuessed && currentCity && (
          <Marker position={currentCity.lat_lng} icon={greenIcon}>
            <Popup>{currentCity.name}</Popup>
          </Marker>
        )}
        {/* Draw line between guessed and actual locations with distance label */}
        {isGuessed && guessedLocation && currentCity && distance !== null && (
          <Polyline
            positions={[guessedLocation, currentCity.lat_lng]}
            color="#2563eb"
            weight={2}
            opacity={0.7}
            dashArray="5, 5"
          >
            <Popup>Distance: {distance.toFixed(2)} km</Popup>
          </Polyline>
        )}
        <MapUpdater onMapMove={onMapMove} isGuessed={isGuessed} />
      </MapContainer>
    </MapWrapper>
  );
}
