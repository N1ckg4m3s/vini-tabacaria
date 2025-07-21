import { flexCenter, flexColumn } from "@/styles/mixins";
import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const GridContainer = styled.div`
    ${flexColumn}
    align-items: center;
    padding: 10px 0;
    gap: 10px;
`

export const ProductGridContainer = styled.div`
    ${flexColumn}
    height: fit-content;
    max-height: 389px;
    gap: 5px;
    flex-wrap:wrap;
    width: fit-content;
    max-width: 100%;
    overflow-x: scroll;

    &::-webkit-scrollbar{
        background-color: transparent;
        height: 10px;
    }
    &::-webkit-scrollbar-thumb{
        background-color: ${Theme.colors.Fundo.cinzaEscuro};
        border-radius: 5px;
        height: 2px;
    }
`

export const TituloGrid = styled.span`
    font-size: 14px;
    color:${Theme.colors.Texto.white};
    text-transform: uppercase;
`