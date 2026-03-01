import { buttonReset } from "@/styles/mixins";
import { GlobalColors } from "@/styles/theme";
import styled, { css } from "styled-components";

const grid = css`
    display: grid;
    gap: 16px;
`

export const dashboardContainer = styled.div`
    padding: 24px;
    display: grid;
    grid-template-rows: auto auto auto;
    gap: 24px;

    color: ${GlobalColors.Text.primary};
`

export const row3Coluns = styled.div`
    ${grid}
    grid-template-columns: repeat(3, 1fr);
`
export const row2Coluns = styled.div`
    ${grid}
    grid-template-columns: repeat(2, 1fr);
`

export const actionsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
`

export const actionCard = styled.button`
    ${buttonReset}
    background-color: ${GlobalColors.Neutral[600]};
    border: 1px dashed ${GlobalColors.Border.subtle};
    padding: 18px;
    border-radius: 10px;
    
    &:hover {
        background-color: ${GlobalColors.Neutral[700]};
    }
`

export const actionSpan = styled.span`
    display: block;
    margin-top: 6px;
    font-size: 13px;
    color: ${GlobalColors.Text.muted};
`