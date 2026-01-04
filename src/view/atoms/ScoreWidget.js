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

  @media (max-width: 600px) {
    padding: 12px;
    top: 10px;
    left: 10px;
  }
`;

const Label = styled(Typography)`
  font-size: 9px;
  color: #999;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;

  @media (max-width: 600px) {
    font-size: 8px;
    margin-bottom: 6px;
  }
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
          "@media (max-width: 600px)": {
            fontSize: "40px",
          },
        }}
      >
        {score}
      </Box>
    </ScoreWidgetContainer>
  );
}
