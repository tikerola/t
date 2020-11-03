import styled, { keyframes } from "styled-components";

const spinnerAnimation = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
    
`;

export const Spinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border: 10px solid gainsboro;
  border-top: 10px solid #333;
  animation-name: ${spinnerAnimation};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  border-radius: 50%;
`;
