import styled from "styled-components";
import MapIcon from "@mui/icons-material/Map";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const NavigatorContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #ffffff;
  border-top: 2px solid #e0e0e0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  @media (max-width: 600px) {
    height: 56px;
  }
`;

const NavItem = styled.button`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${(props) => (props.$active ? "#1976d2" : "#666")};
  font-family: "Fira Mono", monospace;
  font-size: 12px;
  font-weight: ${(props) => (props.$active ? "700" : "400")};
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
  }

  &:active {
    background: #e0e0e0;
  }

  @media (max-width: 600px) {
    font-size: 11px;
  }
`;

const IconWrapper = styled.div`
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

function BottomNavigator({ currentView, onNavigate }) {
  return (
    <NavigatorContainer>
      <NavItem
        $active={currentView === "game"}
        onClick={() => onNavigate("game")}
        aria-label="Map Game"
      >
        <IconWrapper>
          <MapIcon fontSize="inherit" />
        </IconWrapper>
        <span>Game</span>
      </NavItem>
      <NavItem
        $active={currentView === "leaderboard"}
        onClick={() => onNavigate("leaderboard")}
        aria-label="Leaderboard"
      >
        <IconWrapper>
          <EmojiEventsIcon fontSize="inherit" />
        </IconWrapper>
        <span>Leaderboard</span>
      </NavItem>
    </NavigatorContainer>
  );
}

export default BottomNavigator;
