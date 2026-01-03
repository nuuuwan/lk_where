import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";

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

const InfoPanel = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 999;
  max-width: 300px;
`;

const CityName = styled.h2`
  margin: 0 0 10px 0;
  font-size: 20px;
  font-weight: bold;
`;

const Instruction = styled.p`
  margin: 0 0 15px 0;
  color: #666;
  font-size: 14px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const DistanceInfo = styled.div`
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 4px;
  margin-top: 10px;
`;

const DistanceText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #333;
`;

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function MapUpdater({ onMapMove, isGuessed }) {
  useMapEvents({
    moveend: (e) => {
      const center = e.target.getCenter();
      const lat = center.lat.toFixed(4);
      const lng = center.lng.toFixed(4);
      document.title = `${lat}°N, ${lng}°E`;

      if (!isGuessed) {
        onMapMove(center.lat, center.lng);
      }
    },
    click: (e) => {
      if (!isGuessed) {
        onMapMove(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
}

function MapView() {
  const position = useMemo(() => [6.9271, 80.7789], []); // Center of Sri Lanka
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState(null);
  const [guessedLocation, setGuessedLocation] = useState(null);
  const [isGuessed, setIsGuessed] = useState(false);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    // Load cities data
    fetch(process.env.PUBLIC_URL + "/data/static/cities.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCities(data);
        pickRandomCity(data);
      })
      .catch((error) => {
        console.error("Error loading cities:", error);
      });
  }, []);

  const pickRandomCity = (citiesData) => {
    const randomIndex = Math.floor(Math.random() * citiesData.length);
    setCurrentCity(citiesData[randomIndex]);
    setGuessedLocation(null);
    setIsGuessed(false);
    setDistance(null);
  };

  const handleMapMove = (lat, lng) => {
    setGuessedLocation([lat, lng]);
  };

  const handleSubmit = () => {
    if (!guessedLocation || !currentCity) return;

    const dist = calculateDistance(
      guessedLocation[0],
      guessedLocation[1],
      currentCity.lat_lng[0],
      currentCity.lat_lng[1]
    );

    setDistance(dist);
    setIsGuessed(true);
  };

  const handleNextCity = () => {
    pickRandomCity(cities);
  };

  useEffect(() => {
    const lat = position[0].toFixed(4);
    const lng = position[1].toFixed(4);
    document.title = `${lat}°N, ${lng}°E`;
  }, [position]);

  return (
    <MapWrapper>
      <TargetCircle />
      <InfoPanel>
        {!currentCity && cities.length === 0 ? (
          <Instruction>Loading cities...</Instruction>
        ) : currentCity ? (
          <>
            <CityName>{currentCity.name}</CityName>
            <Instruction>
              {isGuessed
                ? "Distance calculated. Pick the next city!"
                : "Navigate to the center of this city and click the map or move the target to your best guess."}
            </Instruction>
            {guessedLocation && !isGuessed && (
              <Button onClick={handleSubmit}>Submit Guess</Button>
            )}
            {isGuessed && distance !== null && (
              <>
                <DistanceInfo>
                  <DistanceText>
                    Distance: <strong>{distance.toFixed(2)} km</strong>
                  </DistanceText>
                  <DistanceText>
                    Actual: {currentCity.lat_lng[0].toFixed(4)}°N,{" "}
                    {currentCity.lat_lng[1].toFixed(4)}°E
                  </DistanceText>
                </DistanceInfo>
                <Button onClick={handleNextCity} style={{ marginTop: "10px" }}>
                  Next City
                </Button>
              </>
            )}
          </>
        ) : null}
      </InfoPanel>
      <MapContainer
        center={position}
        zoom={8}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/stamen_terrain_background/{z}/{x}/{y}{r}.png"
          minZoom={7}
          maxZoom={10}
        />
        {isGuessed && currentCity && (
          <Marker position={currentCity.lat_lng}>
            <Popup>{currentCity.name}</Popup>
          </Marker>
        )}
        <MapUpdater onMapMove={handleMapMove} isGuessed={isGuessed} />
      </MapContainer>
    </MapWrapper>
  );
}

export default MapView;
