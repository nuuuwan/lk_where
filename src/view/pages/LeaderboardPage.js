import styled from "styled-components";
import LeaderboardComponent from "../atoms/LeaderboardComponent";

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

const PageTitle = styled.h1`
  color: white;
  text-align: center;
  margin: 0 0 20px 0;
  font-family: "Fira Mono", monospace;
  font-size: 32px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    font-size: 24px;
    margin-bottom: 15px;
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
  return (
    <PageContainer>
      <PageTitle>🏆 Leaderboard</PageTitle>
      <ContentWrapper>
        <LeaderboardComponent />
      </ContentWrapper>
    </PageContainer>
  );
}

export default LeaderboardPage;
