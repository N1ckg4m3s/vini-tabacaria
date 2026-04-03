import styled from "styled-components";
import { GlobalColors } from "../../../../../styles/theme";
import { flexColumn } from "../../../../../styles/mixins";

export const cardContainer = styled.div`
    background: ${GlobalColors.Neutral[700]};
    padding: 16px;
    border-radius: 12px;
    ${flexColumn}
    gap: 8px;
    border: 1px solid ${GlobalColors.Border.strong};
`

export const cardTitle = styled.h3`
    font-size: 14px;
    font-weight: 600;
    color: ${GlobalColors.Text.secondary};
    text-transform: uppercase;
`

export const cardValue = styled.p`
    color: ${GlobalColors.Text.primary};
    font-size: 28px;
    font-weight: bold;
`

export const cardObs = styled.span`
    color: ${GlobalColors.Text.muted};
    font-size: 12px;
`