import { flexColumn, flexRow } from "@/styles/mixins";
import styled from "styled-components";

export const CatalogoContainer = styled.div`
    width: 100%;
    height: auto;
    ${flexRow}
    gap: 10px;
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