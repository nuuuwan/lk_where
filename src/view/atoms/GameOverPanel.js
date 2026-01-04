import styled from "styled-components";
import { Button, StatItem, StatLabel, StatValue } from "./SharedStyles";

const GameOverPanelContainerStyled = styled.div`
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

const GameOverPanel = styled.div`
  text-align: center;
`;

const GameOverText = styled.h2`
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
`;

export default function GameOverPanel_Component({ score, budget, onRestart }) {
  return (
    <GameOverPanelContainerStyled>
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
        <Button onClick={onRestart} style={{ marginTop: "15px" }}>
          Play Again
        </Button>
      </GameOverPanel>
    </GameOverPanelContainerStyled>
  );
}
