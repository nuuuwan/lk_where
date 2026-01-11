import styled from "styled-components";
import { useState, useEffect } from "react";
import { getLeaderboard } from "../../nonview/core/leaderboardApi";

const LeaderboardContainer = styled.div`
  margin-top: 20px;
  max-height: 300px;
  overflow-y: auto;
  border-top: 2px solid #eee;
  padding-top: 15px;

  @media (max-width: 600px) {
    max-height: 250px;
  }
`;

const LeaderboardTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 16px;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const LeaderboardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LeaderboardEntry = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: ${(props) => (props.$isCurrentPlayer ? "#fff9e6" : "#f9f9f9")};
  border-radius: 4px;
  font-size: 14px;

  @media (max-width: 600px) {
    font-size: 12px;
    padding: 6px 10px;
  }
`;

const EntryRank = styled.span`
  font-weight: 700;
  color: ${(props) => {
    if (props.$rank === 1) return "#FFD700";
    if (props.$rank === 2) return "#C0C0C0";
    if (props.$rank === 3) return "#CD7F32";
    return "#666";
  }};
  min-width: 25px;
`;

const EntryName = styled.span`
  flex: 1;
  margin: 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const EntryScore = styled.span`
  font-weight: 700;
  font-family: "Fira Mono", monospace;
`;

const LoadingText = styled.div`
  text-align: center;
  color: #999;
  padding: 20px;
  font-size: 14px;
`;

const ErrorText = styled.div`
  text-align: center;
  color: #d32f2f;
  padding: 20px;
  font-size: 14px;
`;

export default function LeaderboardComponent({
  currentPlayerName,
  limit = 10,
}) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getLeaderboard(limit);
        console.log("Leaderboard data received:", data);
        setLeaderboard(data || []);
      } catch (err) {
        setError("Failed to load leaderboard");
        console.error("Leaderboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, [limit]);

  if (loading) {
    return (
      <LeaderboardContainer>
        <LeaderboardTitle>Top Players</LeaderboardTitle>
        <LoadingText>Loading leaderboard...</LoadingText>
      </LeaderboardContainer>
    );
  }

  if (error) {
    return (
      <LeaderboardContainer>
        <LeaderboardTitle>Top Players</LeaderboardTitle>
        <ErrorText>{error}</ErrorText>
      </LeaderboardContainer>
    );
  }

  if (!leaderboard || leaderboard.length === 0) {
    return (
      <LeaderboardContainer>
        <LeaderboardTitle>Top Players</LeaderboardTitle>
        <LoadingText>
          No scores yet. Be the first!
          <br />
          <small
            style={{ fontSize: "12px", marginTop: "8px", display: "block" }}
          >
            Play the game and submit your score to appear here.
          </small>
        </LoadingText>
      </LeaderboardContainer>
    );
  }

  return (
    <LeaderboardContainer>
      <LeaderboardTitle>Top {limit} Players</LeaderboardTitle>
      <LeaderboardList>
        {leaderboard.map((entry, index) => (
          <LeaderboardEntry
            key={index}
            $isCurrentPlayer={entry.playerName === currentPlayerName}
          >
            <EntryRank $rank={index + 1}>#{index + 1}</EntryRank>
            <EntryName>{entry.playerName}</EntryName>
            <EntryScore>{entry.score}</EntryScore>
          </LeaderboardEntry>
        ))}
      </LeaderboardList>
    </LeaderboardContainer>
  );
}
