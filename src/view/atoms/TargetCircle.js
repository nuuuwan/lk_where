import styled from "styled-components";

const TargetCircleStyled = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  pointer-events: none;
  z-index: 1000;
  border: 3px solid #000;
  border-radius: 50%;

  @media (max-width: 600px) {
    width: 80px;
    height: 80px;
    border-width: 2px;
  }

  &::before {
    content: "";
    position: absolute;
    width: 50px;
    height: 50px;
    border: 2px solid #000;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 600px) {
    &::before {
      width: 32px;
      height: 32px;
      border-width: 1.5px;
    }
  }

  &::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #000;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 600px) {
    &::after {
      width: 6px;
      height: 6px;
    }
  }
`;

export default function TargetCircle() {
  return <TargetCircleStyled />;
}
