import styled from "styled-components";
import { Button, StatItem, StatLabel, StatValue } from "./SharedStyles";

const ScorePanelStyled = styled.div`
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

export default function ScorePanel({ score, budget }) {
  return (
    <ScorePanelStyled>
      <ScorePanelTitle>AGGREGATE SCORE</ScorePanelTitle>
      <StatItem>
        <StatLabel>Total Score</StatLabel>
        <StatValue>{score}</StatValue>
      </StatItem>
      <StatItem style={{ marginTop: "10px" }}>
        <StatLabel>Travel Budget</StatLabel>
        <StatValue>{budget.toFixed(2)} km</StatValue>
      </StatItem>
    </ScorePanelStyled>
  );
}
