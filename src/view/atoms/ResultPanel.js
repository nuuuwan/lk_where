import styled from "styled-components";

const ResultPanelStyled = styled.div`
  position: fixed;
  top: 60px;
  right: 20px;
  background: white;
  padding: 14px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  z-index: 2000;
  max-width: 300px;

  @media (max-width: 600px) {
    top: auto;
    right: 10px;
    left: 10px;
    bottom: 130px;
    padding: 12px;
    max-width: none;
    border-radius: 4px;
  }
`;

const ResultTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;

  @media (max-width: 600px) {
    font-size: 13px;
    margin-bottom: 6px;
  }
`;

const ResultValue = styled.p`
  margin: 6px 0;
  font-size: 13px;
  color: #555;

  strong {
    color: #1a1a1a;
    font-weight: 600;
  }

  @media (max-width: 600px) {
    font-size: 12px;
    margin: 5px 0;
  }
`;

export default function ResultPanel({ distance, budget }) {
  return (
    <ResultPanelStyled>
      <ResultTitle>Your Guess Result</ResultTitle>
      <ResultValue>
        Distance: <strong>{distance.toFixed(2)} km</strong>
      </ResultValue>
      <ResultValue>
        Remaining Travel Budget:{" "}
        <strong>{Math.max(0, budget).toFixed(2)} km</strong>
      </ResultValue>
    </ResultPanelStyled>
  );
}
