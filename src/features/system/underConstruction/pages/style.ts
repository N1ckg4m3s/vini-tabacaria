import styled, { css, keyframes } from "styled-components";
import { flexCenter } from "../../../../styles/mixins";
import { GlobalColors } from "../../../../styles/theme";

export const pageContainer = styled.div`
    ${flexCenter} 
    width: 100%;
`

export const errorContainer = styled.section`
    ${flexCenter}
    flex-direction: column;
    width: clamp(350px, 50%, 500px);
    height:auto;
    position: relative;
`

export const Canvas = styled.canvas`
    width:100%;
    aspect-ratio: 1/.5;
`

// animação
const fadeIn = keyframes`
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInUp = (delay: number) => css`
  opacity: 0;
  transform: translateY(6px);
  animation: ${fadeIn} 0.6s ${delay}s ease forwards;
`;

export const Menssage = styled.h2`
  margin-top: 12px;

  font-size: 14px;
  font-weight: 400;
  letter-spacing: 0.05em;

  color: ${GlobalColors.Neutral[400]};

  ${fadeInUp(0.5)}
`;

export const BotaoVoltar = styled.button`
  margin-top: 24px;
  padding: 10px 22px;

  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  color: #fff;
  background: transparent;

  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;

  cursor: pointer;
  /* transition: all 0.25s ease; */

  position: relative;
  overflow: hidden;

  ${fadeInUp(0.7)}

  &:hover {
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.05);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255,255,255,0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::after {
    left: 100%;
  }
`;