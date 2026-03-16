import { buttonReset, flexColumn, flexRow } from "@/styles/mixins";
import { GlobalColors } from "@/styles/theme";
import styled from "styled-components";

export const CatalogoContainer = styled.div`
    width: 100%;
    height: auto;
    ${flexRow}
    gap: 10px;

    @media screen and (width<600px) {
        flex-direction: column;
    }
`

export const CatalogoPaginationContainer = styled.div`
    width: 100%;
    height: 100%;
    ${flexColumn}
`

export const ItensContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(193px, 1fr));
    gap: 16px;
`

export const openCatalogContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 0px 10px;

    // Desaparecer quando não necessario
    @media screen and (width>600px) { display: none;}
`

export const openCatalogButton = styled.button`
    ${buttonReset}
    border: 2px solid ${GlobalColors.Border.strong};
    background-color: ${GlobalColors.Neutral[500]}88;

    color: ${GlobalColors.Text.primary};
    padding: 5px 25px;
    border-radius: 10px;

    &:hover{ background-color: ${GlobalColors.Neutral[500]}; }

    z-index: 2;
`