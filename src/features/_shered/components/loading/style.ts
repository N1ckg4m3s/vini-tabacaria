import { flexCenter } from "@/styles/mixins";
import styled, { keyframes } from "styled-components";

export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  ${flexCenter}
  z-index: 10;
  flex-direction: column;
  backdrop-filter: blur(2px);
`;

export const Spinner = styled.div`
  border: 4px solid rgba(0,0,0,0.1);
  border-left-color: #3b82f6; // azul bonito
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 1s linear infinite;
`;

export const Text = styled.span`
  margin-top: 12px;
  font-size: 16px;
  color: #ffffffff;
`;