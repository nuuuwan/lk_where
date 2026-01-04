import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import BudgetChart from "../atoms/BudgetChart";
import TargetCircle from "../atoms/TargetCircle";
import GameInfoPanel from "../atoms/GameInfoPanel";
import RulesPanelComponent from "../atoms/RulesPanelComponent";
import GameOverPanel from "../atoms/GameOverPanel";
import ScoreWidget from "../atoms/ScoreWidget";
import GameMap from "./GameMap";
import { INITIAL_TRAVEL_BUDGET, calculateDistance } from "./gameUtils";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const BudgetChartPanel = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 2000;
  max-width: 150px;

  @media (max-width: 200px) {
    top: 5px;
    right: 5px;
    left: 5px;
    max-width: none;
  }
`;

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
    <>
      <TargetCircle />

      {showRules && <RulesPanelComponent onStart={() => setShowRules(false)} />}

      {gameOver && (
        <GameOverPanel
          score={score}
          budget={budget}
          onRestart={handleRestartGame}
        />
      )}

      {!showRules && !gameOver && cities.length > 0 && (
        <GameInfoPanel
          currentCity={currentCity}
          isGuessed={isGuessed}
          guessedLocation={guessedLocation}
          budget={budget}
          onSubmit={handleSubmit}
          onNextCity={handleNextCity}
        />
      )}

      {/* Score Widget - shown during gameplay */}
      {!showRules && !gameOver && currentCity && <ScoreWidget score={score} />}

      {/* Result Panel - Only show when guess is submitted */}
      {!showRules && !gameOver && currentCity && isGuessed}

      {/* Budget Pie Chart - Show during gameplay */}
      {!showRules && !gameOver && currentCity && (
        <BudgetChartPanel>
          <BudgetChart
            used={INITIAL_TRAVEL_BUDGET - budget}
            total={INITIAL_TRAVEL_BUDGET}
          />
        </BudgetChartPanel>
      )}

      <GameMap
        position={position}
        currentCity={currentCity}
        isGuessed={isGuessed}
        guessedLocation={guessedLocation}
        distance={distance}
        onMapMove={handleMapMove}
      />
    </>
  );
}

export default MapView;
