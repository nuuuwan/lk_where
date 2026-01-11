import styled from "styled-components";
import { useState } from "react";
import LeaderboardComponent from "../atoms/LeaderboardComponent";
import RefreshIcon from "@mui/icons-material/Refresh";

const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-bottom: 80px;
  overflow-y: auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  @media (max-width: 600px) {
    padding: 15px;
    padding-bottom: 76px;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;

  @media (max-width: 600px) {
    margin-bottom: 15px;
  }
`;

const PageTitle = styled.h1`
  color: white;
  text-align: center;
  margin: 0;
  font-family: "Fira Mono", monospace;
  font-size: 32px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    font-size: 24px;
  }
`;

const RefreshButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.4);
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

  @media (max-width: 600px) {
    width: 36px;
    height: 36px;
  }
`;

const ContentWrapper = styled.div`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 600px) {
    padding: 16px;
    border-radius: 8px;
  }
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
