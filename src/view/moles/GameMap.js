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
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
          <>
            <Polyline
              positions={[guessedLocation, currentCity.lat_lng]}
              color="#ef5350"
              weight={2}
              opacity={0.7}
              dashArray="5, 5"
            >
              <Popup>Distance: {distance.toFixed(2)} km</Popup>
            </Polyline>
            {/* Distance label at midpoint */}
            <Marker
              position={[
                (guessedLocation[0] + currentCity.lat_lng[0]) / 2,
                (guessedLocation[1] + currentCity.lat_lng[1]) / 2,
              ]}
              icon={L.divIcon({
                html: `<div style="background: white; padding: 4px 8px; border-radius: 4px; border: 1px solid #ef5350; font-family: 'Fira Mono', monospace; font-size: 12px; font-weight: 600; color: #ef5350; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">${Math.round(
                  distance
                )} km</div>`,
                className: "distance-label",
                iconSize: null,
              })}
            />
          </>
        )}
        <MapUpdater onMapMove={onMapMove} isGuessed={isGuessed} />
      </MapContainer>
    </MapWrapper>
  );
}
