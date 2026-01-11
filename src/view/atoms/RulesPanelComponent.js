import styled from "styled-components";
import { Button } from "./SharedStyles";
import { INITIAL_TRAVEL_BUDGET } from "../moles/gameUtils";

const RulesPanelContainerStyled = styled.div`
  position: fixed;
  bottom: 80px;
  left: 20px;
  background: white;
  padding: 18px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  z-index: 2000;
  max-width: 380px;
  max-height: calc(70vh - 80px);
  overflow-y: auto;

  @media (max-width: 600px) {
    padding: 14px;
    bottom: 70px;
    left: 10px;
    right: 10px;
    max-width: none;
    max-height: calc(80vh - 70px);
    border-radius: 4px;
  }
`;

const RulesPanel = styled.div`
  text-align: left;
`;

const RulesTitle = styled.h2`
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;

  @media (max-width: 600px) {
    font-size: 16px;
    margin-bottom: 10px;
  }
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

  @media (max-width: 600px) {
    font-size: 12px;
    padding-left: 16px;
    margin-bottom: 10px;

    li {
      margin-bottom: 5px;
    }
  }
`;

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
