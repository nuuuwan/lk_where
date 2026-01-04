import styled from "styled-components";
import { Paper, Typography, Box } from "@mui/material";

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
  font-size: 9px;
  color: #999;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

export default function ScoreWidget({ score }) {
  return (
    <ScoreWidgetContainer>
      <Label>Total Score</Label>
      <Box
        sx={{
          fontSize: "56px",
          fontWeight: 900,
          color: "#000",
          fontFamily: '"Fira Mono", monospace',
          textAlign: "center",
          lineHeight: 1,
        }}
      >
        {score}
      </Box>
    </ScoreWidgetContainer>
  );
}
