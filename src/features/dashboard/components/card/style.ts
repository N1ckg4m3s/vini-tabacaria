import { GlobalColors } from "@/styles/theme";
import styled from "styled-components";

export const cardContainer = styled.div`
    background-color: ${GlobalColors.Neutral[600]};
    border: 1px solid ${GlobalColors.Border.subtle};
    border-radius: 10px;
    padding: 20px;
`

export const cardTitle = styled.h3`
    margin: 0 0 12px;
    font-size: 14px;
    font-weight: 600;
    color: ${GlobalColors.Text.muted};
    text-transform: uppercase;
    letter-spacing: 0.04em;
`

export const cardMetric = styled.div`
    font-size: 32px;
    font-weight: 700;
`

export const cardSub = styled.div`
    margin-top: 6px;
    font-size: 13px;
    color: ${GlobalColors.Text.muted};
`