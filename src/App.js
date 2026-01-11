import { ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import MapView from "./view/moles/MapView";
import LeaderboardPage from "./view/pages/LeaderboardPage";
import BottomNavigator from "./view/atoms/BottomNavigator";
import styled from "styled-components";
import theme from "./theme";

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  flex: 1;
  overflow: hidden;
  position: relative;
`;

function App() {
  const [currentView, setCurrentView] = useState("game");

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <ContentContainer>
          {currentView === "game" ? (
            <MapView onViewLeaderboard={() => handleNavigate("leaderboard")} />
          ) : (
            <LeaderboardPage />
          )}
        </ContentContainer>
        <BottomNavigator
          currentView={currentView}
          onNavigate={handleNavigate}
        />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
