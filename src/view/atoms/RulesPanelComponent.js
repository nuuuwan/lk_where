import styled from "styled-components";
import { Button } from "./SharedStyles";

const RulesPanelContainerStyled = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: white;
  padding: 18px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  z-index: 2000;
  max-width: 380px;
  max-height: 70vh;
  overflow-y: auto;
`;

const RulesPanel = styled.div`
  text-align: left;
`;

const RulesTitle = styled.h2`
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
`;

const RulesList = styled.ul`
  margin: 0 0 12px 0;
  padding-left: 18px;
  font-size: 13px;
  line-height: 1.5;
  color: #555;

  li {
    margin-bottom: 6px;
  }

  strong {
    color: #1a1a1a;
    font-weight: 600;
  }
`;

const RulesText = styled.p`
  margin: 0 0 12px 0;
  font-size: 13px;
  color: #666;
  line-height: 1.5;
  background: #f9fafb;
  padding: 10px 12px;
  border-radius: 4px;
  border-left: 3px solid #2563eb;
`;

const INITIAL_TRAVEL_BUDGET = 1_000;

export default function RulesPanel_Component({ onStart }) {
  return (
    <RulesPanelContainerStyled>
      <RulesPanel>
        <RulesTitle>🎯 LK Where - Game Rules</RulesTitle>
        <RulesList>
          <li>
            You have a <strong>{INITIAL_TRAVEL_BUDGET} km travel budget</strong>{" "}
            to guess as many cities as you can.
          </li>
          <li>A random place name will appear at the top of the screen.</li>
          <li>
            Navigate the map and position the <strong>target</strong> at the
            center of the place.
          </li>
          <li>Click the map or move the target to your best guess location.</li>
          <li>
            Click <strong>Submit Guess</strong> to reveal the distance between
            your guess and the actual location.
          </li>
          <li>
            Each correct guess earns you <strong>1 point</strong>.
          </li>
          <li>When your travel budget runs out, the game ends.</li>
          <li>
            Try to maximize your score before the travel budget is exhausted!
          </li>
        </RulesList>
        <RulesText>
          <strong>Tip:</strong> The closer your guess to the actual location,
          the less travel budget is used, leaving more chances to guess other
          cities!
        </RulesText>
        <Button onClick={onStart}>Start Game</Button>
      </RulesPanel>
    </RulesPanelContainerStyled>
  );
}
