import styled, { keyframes } from "styled-components";
import { DataUsage } from "@material-ui/icons";
import Color from "./Color";

const Spinner = () => {
  return (
    <Container>
      <DataUsage />
      <DataUsage fontSize="large" />
    </Container>
  );
};

const rotate = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;

const rotateReverse = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0);
  }
  100% {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
`;

const Container = styled.div`
  padding: 0;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${Color.white};
  opacity: 0.9;
  overflow: hidden;
  z-index: 9;
  & > * {
    position: absolute;
    top: 50%;
    left: 50%;
  }
  & > *:first-child {
    animation: ${rotate} 1s ease-in-out infinite;
    color: ${Color.lightGreen};
  }

  & > *:last-child {
    animation: ${rotateReverse} 1s ease-in-out infinite;
    color: ${Color.green};
  }
`;

export default Spinner;
