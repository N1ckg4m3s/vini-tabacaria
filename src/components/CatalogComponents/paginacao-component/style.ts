import { buttonReset, flexCenter } from "@/styles/mixins";
import { GlobalColors } from "@/styles/theme";
import styled from "styled-components";

export const PaginacaoContainer = styled.div`
    width: 100%;
    height: 35px;
    padding: 5px;
    ${flexCenter}
    gap: 5px;
`;

export const BotaoModificacaoPagina = styled.button<{ $ePaginaAtual?: boolean }>`
  ${buttonReset};
  ${flexCenter};
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 10px;
  background-color: ${({ $ePaginaAtual }) => (!$ePaginaAtual ? 'transparent' : GlobalColors.Neutral[700])};
  transition: background-color 0.1s;
    
  color: ${({ $ePaginaAtual }) => (
    $ePaginaAtual ?
      GlobalColors.Text.primary :
      GlobalColors.Text.muted
  )};

  &:hover {
    background-color: ${GlobalColors.Neutral[700]};
    color: ${GlobalColors.Text.primary}
  }

  &:disabled {
    cursor: not-allowed;
    opacity: ${({ $ePaginaAtual }) => ($ePaginaAtual ? 1 : 0.6)};
  }
`;

export const RetisenciasContainer = styled.div`
  height: 100%;
  aspect-ratio: 1/1;
  ${flexCenter};
`;

export const Reticencia = styled.div`
  width: 60%;
  height: 2px;
  background-color: gray;
  border-radius: 2px;
`;