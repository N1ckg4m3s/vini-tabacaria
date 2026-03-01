import { flexColumn } from "@/styles/mixins";
import { GlobalColors } from "@/styles/theme"; // to update
import styled, { css } from "styled-components";

export const SummaryContainer = styled.aside`
    background: ${GlobalColors.Neutral[600]};
    border: 1px solid ${GlobalColors.Border.subtle};
    color: ${GlobalColors.Text.primary};
    border-radius: 16px;
    padding: 24px;
    height: fit-content;
`

export const SummaryTitle = styled.h2`
    margin-top: 0;
    margin-bottom: 24px;
`

const summaryLineBase = css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
`

export const SummaryLine = styled.div` ${summaryLineBase} `

export const SummaryLine_Muted = styled.div`
    ${summaryLineBase};
    color: ${GlobalColors.Text.secondary};
`

export const SummaryTotal = styled.div`
    ${summaryLineBase};
    font-size: 1.2rem;
    font-weight: 700;
    margin: 24px 0;
`

export const ActionsButton=styled.div`
    ${flexColumn}
    justify-content: center;
`

export const FinishButton = styled.button`
    width: 100%;
    padding: 16px;
    border-radius: 14px;
    border: none;
    background: ${GlobalColors.Primary.base};
    color: #052e16;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        filter: brightness(1.05);
    }
`

export const ClearButtton = styled.button`
    margin-top: 8px;
    background: none;
    border: none;
    color: #ef4444;
    font-size: 0.8rem;
    cursor: pointer;
`