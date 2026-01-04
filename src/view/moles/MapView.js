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
import BudgetPieChart from "../atoms/BudgetPieChart";

// Constants
const INITIAL_TRAVEL_BUDGET = 1_000; // km

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
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: white;
  padding: 16px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  z-index: 4000;
  max-width: 280px;
`;

const RulesPanelContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: white;
  padding: 18px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  z-index: 2000;
  max-width: 380px;
  max-height: 70vh;
  overflow-y: auto;
`;

const GameOverPanelContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: white;
  padding: 16px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  z-index: 2000;
  max-width: 280px;
`;

const PlaceName = styled.h2`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
`;

const Instruction = styled.p`
  margin: 0 0 12px 0;
  color: #666;
  font-size: 13px;
  line-height: 1.4;
`;

const Button = styled.button`
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  margin-right: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #d1d5db;
    cursor: not-allowed;
  }
`;

const AggregateScorePanel = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background: linear-gradient(135deg, #ffffff 0%, #f9fafb 100%);
  padding: 12px 20px;
  border-bottom: 1px solid #e5e7eb;
  border-radius: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  z-index: 999;
  display: flex;
  justify-content: flex-end;
  gap: 30px;
`;

const ScorePanelTitle = styled.p`
  margin: 0;
  font-size: 11px;
  color: #999;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ResultPanel = styled.div`
  position: fixed;
  top: 60px;
  right: 20px;
  background: white;
  padding: 14px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  z-index: 2000;
  max-width: 300px;
`;

const BudgetChartPanel = styled.div`
  position: fixed;
  top: 60px;
  right: 20px;
  z-index: 2000;
  max-width: 360px;
`;

const ResultTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
`;

const ResultValue = styled.p`
  margin: 6px 0;
  font-size: 13px;
  color: #555;

  strong {
    color: #1a1a1a;
    font-weight: 600;
  }
`;

const StatItem = styled.div`
  text-align: center;
  display: inline-block;
`;

const StatLabel = styled.p`
  margin: 0;
  font-size: 10px;
  color: #999;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

const StatValue = styled.p`
  margin: 4px 0 0 0;
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
`;

const GameOverPanel = styled.div`
  text-align: center;
`;

const GameOverText = styled.h2`
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
`;

const RulesPanel = styled.div`
  text-align: left;
`;

const RulesTitle = styled.h2`
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
`;

const RulesList = styled.ul`
  margin: 0 0 12px 0;
  padding-left: 18px;
  font-size: 13px;
  line-height: 1.5;
  color: #555;

  li {
    margin-bottom: 6px;
  }

  strong {
    color: #1a1a1a;
    font-weight: 600;
  }
`;

const RulesText = styled.p`
  margin: 0 0 12px 0;
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  background: #f9fafb;
  padding: 10px 12px;
  border-radius: 4px;
  border-left: 3px solid #2563eb;
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
  const [budget, setBudget] = useState(INITIAL_TRAVEL_BUDGET); // km budget
  const [score, setScore] = useState(0); // points scored
  const [gameOver, setGameOver] = useState(false);
  const [showRules, setShowRules] = useState(true); // Show rules on first load

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

    // Deduct distance from budget
    const newBudget = budget - dist;
    setBudget(newBudget);

    // Add point for this guess
    setScore(score + 1);

    // Check if game is over
    if (newBudget <= 0) {
      setGameOver(true);
    }
  };

  const handleNextCity = () => {
    if (budget <= 0) {
      setGameOver(true);
    } else {
      pickRandomCity(cities);
    }
  };

  const handleRestartGame = () => {
    setBudget(INITIAL_TRAVEL_BUDGET);
    setScore(0);
    setGameOver(false);
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

      {showRules && (
        <RulesPanelContainer>
          <RulesPanel>
            <RulesTitle>🎯 LK Where - Game Rules</RulesTitle>
            <RulesList>
              <li>
                You have a{" "}
                <strong>{INITIAL_TRAVEL_BUDGET} km travel budget</strong> to
                guess as many cities as you can.
              </li>
              <li>A random place name will appear at the top of the screen.</li>
              <li>
                Navigate the map and position the <strong>target</strong> at the
                center of the place.
              </li>
              <li>
                Click the map or move the target to your best guess location.
              </li>
              <li>
                Click <strong>Submit Guess</strong> to reveal the distance
                between your guess and the actual location.
              </li>
              <li>
                Each correct guess earns you <strong>1 point</strong>.
              </li>
              <li>When your travel budget runs out, the game ends.</li>
              <li>
                Try to maximize your score before the travel budget is
                exhausted!
              </li>
            </RulesList>
            <RulesText>
              <strong>Tip:</strong> The closer your guess to the actual
              location, the less travel budget is used, leaving more chances to
              guess other cities!
            </RulesText>
            <Button onClick={() => setShowRules(false)}>Start Game</Button>
          </RulesPanel>
        </RulesPanelContainer>
      )}

      {gameOver && (
        <GameOverPanelContainer>
          <GameOverPanel>
            <GameOverText>Game Over!</GameOverText>
            <StatItem>
              <StatLabel>Final Score</StatLabel>
              <StatValue>{score}</StatValue>
            </StatItem>
            <StatItem>
              <StatLabel>Travel Budget Remaining</StatLabel>
              <StatValue>{budget.toFixed(2)} km</StatValue>
            </StatItem>
            <Button onClick={handleRestartGame} style={{ marginTop: "15px" }}>
              Play Again
            </Button>
          </GameOverPanel>
        </GameOverPanelContainer>
      )}

      {!showRules &&
        !gameOver &&
        cities.length > 0 &&
        (currentCity ? (
          <InfoPanel>
            <PlaceName>{currentCity.name}</PlaceName>
            <Instruction>
              {isGuessed
                ? "Distance calculated. Pick the next place!"
                : "Navigate to the center of this place and click the map or move the target to your best guess."}
            </Instruction>
            {guessedLocation && !isGuessed && (
              <Button onClick={handleSubmit}>Submit Guess</Button>
            )}
            {isGuessed && (
              <Button
                onClick={handleNextCity}
                style={{ marginTop: "10px" }}
                disabled={budget <= 0}
              >
                {budget <= 0 ? "Game Over" : "Next City"}
              </Button>
            )}
          </InfoPanel>
        ) : (
          <InfoPanel>
            <Instruction>Loading cities...</Instruction>
          </InfoPanel>
        ))}

      {/* Aggregate Score Panel - shown during gameplay */}
      {!showRules && !gameOver && currentCity && (
        <AggregateScorePanel>
          <ScorePanelTitle>AGGREGATE SCORE</ScorePanelTitle>
          <StatItem>
            <StatLabel>Total Score</StatLabel>
            <StatValue>{score}</StatValue>
          </StatItem>
          <StatItem style={{ marginTop: "10px" }}>
            <StatLabel>Travel Budget</StatLabel>
            <StatValue>{budget.toFixed(2)} km</StatValue>
          </StatItem>
        </AggregateScorePanel>
      )}

      {/* Result Panel - Only show when guess is submitted */}
      {!showRules &&
        !gameOver &&
        currentCity &&
        isGuessed &&
        distance !== null && (
          <ResultPanel>
            <ResultTitle>Your Guess Result</ResultTitle>
            <ResultValue>
              Distance: <strong>{distance.toFixed(2)} km</strong>
            </ResultValue>
            <ResultValue>
              Remaining Travel Budget:{" "}
              <strong>{Math.max(0, budget).toFixed(2)} km</strong>
            </ResultValue>
          </ResultPanel>
        )}

      {/* Budget Pie Chart - Show during gameplay */}
      {!showRules && !gameOver && currentCity && (
        <BudgetChartPanel>
          <BudgetPieChart
            used={INITIAL_TRAVEL_BUDGET - budget}
            total={INITIAL_TRAVEL_BUDGET}
          />
        </BudgetChartPanel>
      )}
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
