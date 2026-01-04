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
        <RulesTitle>🇱🇰 LK Where</RulesTitle>
        <RulesList>
          <li>
            You have <strong>{INITIAL_TRAVEL_BUDGET} km</strong> to spend.
          </li>
          <li>A place name appears - lock in your guess on the map.</li>
          <li>
            Submit to see how far off you were.{" "}
            <strong>Closer = more km left.</strong>
          </li>
          <li>
            <strong>1 point</strong> per guess.
          </li>
        </RulesList>

        <Button onClick={onStart}>Start Game</Button>
      </RulesPanel>
    </RulesPanelContainerStyled>
  );
}
