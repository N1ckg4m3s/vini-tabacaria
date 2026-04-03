import styled, { css } from "styled-components";
import { GlobalColors } from "../../../../styles/theme";
import { flexColumn } from "../../../../styles/mixins";

export const tituloSessao = styled.h2`
    margin-bottom: 12px;
    font-size: 18px;
    color: ${GlobalColors.Text.secondary};
`

export const funelSection = styled.section`
    ${flexColumn};
    gap: 16px;
`

const listBases = css`
    display: grid;
    gap: 16px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`

export const cardsList = styled.div`
    ${listBases}
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`

export const charsList = styled.div`
    ${listBases}
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-template-rows: 250px;
    justify-items: center
`

