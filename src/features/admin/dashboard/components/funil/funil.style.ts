import styled from "styled-components";
import { flexCenter } from "../../../../../styles/mixins";
import { GlobalColors } from "../../../../../styles/theme";

export const funelContainer = styled.div`
    ${flexCenter}
    gap: 20px;
    margin: auto;
    flex-wrap: wrap;
`

export const stepContainer = styled.div`
    ${flexCenter}
    flex-direction: column;
    background: ${GlobalColors.Neutral[700]};
    border: 1px solid ${GlobalColors.Border.strong};
    border-radius: 12px;
    padding: 14px 20px;
    min-width: 120px;
`

export const stepLabel = styled.span`
    color: ${GlobalColors.Text.secondary};
    font-size: 13px;
    `

export const stepValue = styled.span`
    color: ${GlobalColors.Text.primary};
    font-weight: bold;
    font-size: 26px;
`

/* FLOW */
export const flowContainer = styled.div`
    ${flexCenter}
    gap: 6px;
`

export const flowPorcent = styled.div`
    font-size: 14px;
    font-weight: bold;
    color: ${GlobalColors.Primary.strong};
`

export const flowArrow = styled.div`
    font-size: 16px;
    color: ${GlobalColors.Text.muted};
`

/* TOTAL */
export const funelResumeContainer = styled.div`
    ${flexCenter}
    margin-top: 8px;
    font-size: 14px;
`

export const resumeValue = styled.div`
    margin-left: 6px;
    font-size: 18px;
    color: ${GlobalColors.Primary.base};
`