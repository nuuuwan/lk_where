import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import BudgetPieChart from "../atoms/BudgetPieChart";
import TargetCircle from "../atoms/TargetCircle";
import GameInfoPanel from "../atoms/GameInfoPanel";
import ScorePanel from "../atoms/ScorePanel";
import ResultPanel from "../atoms/ResultPanel";
import RulesPanelComponent from "../atoms/RulesPanelComponent";
import GameOverPanel from "../atoms/GameOverPanel";
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
  top: 60px;
  right: 20px;
  z-index: 2000;
  max-width: 360px;
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

      {/* Aggregate Score Panel - shown during gameplay */}
      {!showRules && !gameOver && currentCity && (
        <ScorePanel score={score} budget={budget} />
      )}

      {/* Result Panel - Only show when guess is submitted */}
      {!showRules &&
        !gameOver &&
        currentCity &&
        isGuessed &&
        distance !== null && (
          <ResultPanel distance={distance} budget={budget} />
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

      <GameMap
        position={position}
        currentCity={currentCity}
        isGuessed={isGuessed}
        onMapMove={handleMapMove}
      />
    </>
  );
}

export default MapView;
