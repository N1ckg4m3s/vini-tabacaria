import { buttonReset, flexCenter } from "@/styles/mixins";
import { GlobalColors } from "@/styles/theme"; // to update
import styled from "styled-components";

export const PaginacaoContainer = styled.div`
    width: 100%;
    height: 35px;
    padding: 5px;
    /* background-color: red; */
    ${flexCenter}
    gap: 5px;
`;

export const BotaoModificacaoPagina = styled.button<{ $ePaginaAtual?: boolean }>`
  ${buttonReset};
  ${flexCenter};
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 10px;
  background-color: transparent;
  transition: background-color 0.1s;

  &:hover {
    background-color: ${GlobalColors.Neutral[600]};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: ${({ $ePaginaAtual }) => ($ePaginaAtual ? 1 : 0.6)};
  }
  
  color: ${({ $ePaginaAtual }) => ($ePaginaAtual ? GlobalColors.Text.primary : GlobalColors.Text.muted)};
  background-color: ${({ $ePaginaAtual }) => (!$ePaginaAtual ? 'transparent' : GlobalColors.Neutral[300])};
`;


export const RetisenciasContainer = styled.div`
  height: 100%;
  aspect-ratio: 1 / 1;
  ${flexCenter};
`;

export const Reticencia = styled.div`
  width: 60%;
  height: 2px;
  background-color: gray;
  border-radius: 2px;
`;