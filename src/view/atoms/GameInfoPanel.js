import styled from "styled-components";
import { useEffect } from "react";
import { Button } from "./SharedStyles";

const InfoPanelStyled = styled.div`
  position: fixed;
  bottom: 80px;
  left: 20px;
  background: white;
  padding: 16px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  z-index: 4000;
  max-width: 280px;

  @media (max-width: 600px) {
    padding: 12px;
    bottom: 70px;
    left: 10px;
    right: 10px;
    max-width: none;
    border-radius: 4px;
  }
`;

const PlaceName = styled.h2`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;

  @media (max-width: 600px) {
    font-size: 16px;
    margin-bottom: 6px;
  }
`;

const Instruction = styled.p`
  margin: 0 0 12px 0;
  color: #666;
  font-size: 13px;
  line-height: 1.4;

  @media (max-width: 600px) {
    font-size: 12px;
    margin-bottom: 10px;
  }
`;

export default function GameInfoPanel({
  currentCity,
  isGuessed,
  guessedLocation,
  budget,
  onSubmit,
  onNextCity,
}) {
  // Auto-advance to next city after a delay to show markers
  useEffect(() => {
    if (isGuessed && budget > 0) {
      const timer = setTimeout(() => {
        onNextCity();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isGuessed, budget, onNextCity]);

  if (!currentCity) {
    return (
      <InfoPanelStyled>
        <Instruction>Loading cities...</Instruction>
      </InfoPanelStyled>
    );
  }

  return (
    <InfoPanelStyled>
      <PlaceName>{currentCity.name}</PlaceName>
      <Instruction>
        {isGuessed
          ? "Loading next place..."
          : "Lock in on this location - pan the map and place your marker."}
      </Instruction>
      {guessedLocation && !isGuessed && (
        <Button onClick={onSubmit}>Submit Guess</Button>
      )}
    </InfoPanelStyled>
  );
}
