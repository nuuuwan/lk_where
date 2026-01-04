import styled from "styled-components";
import { Paper, Typography } from "@mui/material";

const ScoreWidgetContainer = styled(Paper)`
  padding: 16px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 3000;
  font-family: "Fira Mono", monospace;
  text-align: center;
`;

const Label = styled(Typography)`
  font-size: 12px;
  color: #999;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

const Value = styled(Typography)`
  font-size: 48px;
  font-weight: 900;
  color: #1a1a1a;
  font-family: "Fira Mono", monospace;
  text-align: center;
`;

export default function ScoreWidget({ score }) {
  return (
    <ScoreWidgetContainer>
      <Label>Total Score</Label>
      <Value>{score}</Value>
    </ScoreWidgetContainer>
  );
}
