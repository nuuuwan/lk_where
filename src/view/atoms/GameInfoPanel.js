import styled from "styled-components";
import { Button } from "./SharedStyles";

const InfoPanelStyled = styled.div`
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

export default function GameInfoPanel({
  currentCity,
  isGuessed,
  guessedLocation,
  budget,
  onSubmit,
  onNextCity,
}) {
  // Auto-advance to next city when guess is submitted
  if (isGuessed && budget > 0) {
    onNextCity();
  }

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
          : "Navigate to the center of this place and click the map or move the target to your best guess."}
      </Instruction>
      {guessedLocation && !isGuessed && (
        <Button onClick={onSubmit}>Submit Guess</Button>
      )}
    </InfoPanelStyled>
  );
}
