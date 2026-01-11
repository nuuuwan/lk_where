import styled from "styled-components";
import { useState, useEffect } from "react";
import { Button } from "./SharedStyles";
import LeaderboardComponent from "./LeaderboardComponent";
import {
  submitScore,
  savePlayerName,
  getPlayerName,
} from "../../nonview/core/leaderboardApi";

const GameOverPanelContainerStyled = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: white;
  padding: 16px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  z-index: 2000;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;

  @media (max-width: 600px) {
    padding: 14px;
    bottom: 10px;
    left: 10px;
    right: 10px;
    max-width: none;
    border-radius: 4px;
    max-height: 85vh;
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

const NameInputContainer = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NameInput = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 2px solid #ddd;
  border-radius: 4px;
  text-align: center;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #4caf50;
  }

  @media (max-width: 600px) {
    font-size: 13px;
    padding: 8px;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #4caf50;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  color: #4caf50;
  font-size: 14px;
  margin: 10px 0;
  font-weight: 600;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  font-size: 14px;
  margin: 10px 0;
`;

export default function GameOverPanel_Component({ score, onRestart }) {
  const [playerName, setPlayerName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load saved player name from localStorage
    const savedName = getPlayerName();
    if (savedName) {
      setPlayerName(savedName);
    }
  }, []);

  const handleSubmitScore = async () => {
    if (!playerName.trim()) {
      setError("Please enter your name");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await submitScore(playerName.trim(), score);
      savePlayerName(playerName.trim());
      setSubmitted(true);
    } catch (err) {
      setError("Failed to submit score. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handlePlayAgain = () => {
    setSubmitted(false);
    setError(null);
    onRestart();
  };

  return (
    <GameOverPanelContainerStyled>
      <GameOverPanel>
        <GameOverText>Game Over!</GameOverText>
        <ScoreLevelText>{score}</ScoreLevelText>

        {!submitted ? (
          <NameInputContainer>
            <NameInput
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              maxLength={50}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSubmitScore();
                }
              }}
            />
            <SubmitButton
              onClick={handleSubmitScore}
              disabled={submitting || !playerName.trim()}
            >
              {submitting ? "Submitting..." : "Submit Score"}
            </SubmitButton>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </NameInputContainer>
        ) : (
          <SuccessMessage>Score submitted! 🎉</SuccessMessage>
        )}

        <Button onClick={handlePlayAgain}>Play Again</Button>

        {submitted && (
          <LeaderboardComponent currentPlayerName={playerName} limit={10} />
        )}
      </GameOverPanel>
    </GameOverPanelContainerStyled>
  );
}
