import styled from "styled-components";
import { Button } from "./SharedStyles";

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

  @media (max-width: 600px) {
    padding: 14px;
    bottom: 10px;
    left: 10px;
    right: 10px;
    max-width: none;
    border-radius: 4px;
  }
`;

const GameOverPanel = styled.div`
  text-align: center;
`;

const GameOverText = styled.h2`
  margin: 0 0 12px 0;
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;

  @media (max-width: 600px) {
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

const ScoreLevelText = styled.div`
  font-size: 48px;
  font-weight: 900;
  margin-bottom: 15px;
  font-family: "Fira Mono", monospace;
  color: #1a1a1a;

  @media (max-width: 600px) {
    font-size: 36px;
    margin-bottom: 12px;
  }
`;

export default function GameOverPanel_Component({ score, onRestart }) {
  return (
    <GameOverPanelContainerStyled>
      <GameOverPanel>
        <GameOverText>Game Over!</GameOverText>
        <ScoreLevelText>{score}</ScoreLevelText>
        <Button onClick={onRestart}>Play Again</Button>
      </GameOverPanel>
    </GameOverPanelContainerStyled>
  );
}
