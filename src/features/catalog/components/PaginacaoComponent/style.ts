import { buttonReset, flexCenter } from "@/styles/mixins";
import { Theme } from "@/styles/theme";
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
    background-color: ${Theme.colors.Fundo.cinzaEscuro};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: ${({ $ePaginaAtual }) => ($ePaginaAtual ? 1 : 0.6)};
  }
  
  color: ${({ $ePaginaAtual }) => (Theme.colors.Texto[$ePaginaAtual ? 'black' : 'white'])};
  background-color: ${({ $ePaginaAtual }) => (!$ePaginaAtual ? 'transparent' : Theme.colors.Fundo.CinzaClaro)};
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