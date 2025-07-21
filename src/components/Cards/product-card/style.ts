import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const CardContainer = styled.div<{ $small: string }>`
    background-color: ${Theme.colors.Fundo.cinzaEscuro};
    width: 100%;
    max-width: ${({ $small }) => ($small == 'sim' ? '150px' : '200px')};
    max-height: 246px;
    border-radius: 20px;
    padding: 5px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
`;

export const CardImageContainer = styled.div`
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
`;

export const CardImage = styled.img`
    width: 100%;
    height: 100%;
`;

export const CardValue = styled.p`
    padding: 2px 5px;
    top: 5px;
    border-radius: 20px;
    font-weight: 500;
    right: 5px;
    background-color: ${Theme.colors.Fundo.cinzaEscuro};
    color: ${Theme.colors.Texto.white};
    position: absolute;
`;

export const CardTitle = styled.p`
    font-size: clamp(10px, 100%, 20px);
    font-weight: bold;
    text-align: center;
    color: ${Theme.colors.Texto.white};
`;

export const CardEspecificacao = styled.p`
    font-size: clamp(8px, 100%, 12px);
    text-align: center;
    color: ${Theme.colors.Texto.white};
`;

export const CardContainerIndicadorNoCarrinho = styled.div<{ $noCarrinho: string }>`
    position: absolute;
    display: ${({ $noCarrinho }) => $noCarrinho == 'sim' ? 'flex' : 'none'};
    gap: 5px;
    background-color: red;
    border-radius: 0 0 15px 0;
    padding: 2px 10px;
    top: 0;
    left: 0;
    z-index: 1;
`;

export const CardCarrinhoTextoIndicador = styled.p`
    font-size:10px;
    color: ${Theme.colors.Texto.white};
`;

