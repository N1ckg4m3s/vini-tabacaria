import { flexColumn } from "@/styles/mixins";
import styled from "styled-components";

export const CatalogoContainer = styled.div`
    width: 100%;
    min-height: 100%;
    ${flexColumn}
`

export const ItensContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
`