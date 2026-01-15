import styled from "styled-components";
import { useState } from "react";
import LeaderboardComponent from "../atoms/LeaderboardComponent";
import RefreshIcon from "@mui/icons-material/Refresh";

const PageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 50px;
  overflow-y: auto;
  background: linear-gradient(135deg, #00f 0%, #0f0 100%);
  box-sizing: border-box;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
  flex-shrink: 0;
`;

const PageTitle = styled.h1`
  color: white;
  text-align: center;
  margin: 0;
  font-family: "Fira Mono", monospace;
  font-size: 32px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const RefreshButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
  }

  &:active {
    transform: scale(0.95) rotate(90deg);
  }
`;

const ContentWrapper = styled.div`
  background: white;
  border-radius: 6px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
`;

function LeaderboardPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <PageContainer>
      <HeaderContainer>
        <PageTitle>🏆 Leaderboard</PageTitle>
        <RefreshButton onClick={handleRefresh} aria-label="Refresh leaderboard">
          <RefreshIcon />
        </RefreshButton>
      </HeaderContainer>
      <ContentWrapper>
        <LeaderboardComponent key={refreshKey} limit={100} />
      </ContentWrapper>
    </PageContainer>
  );
}

export default LeaderboardPage;
