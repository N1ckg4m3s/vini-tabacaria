import { flexColumn, flexSpaceBetween } from "@/styles/mixins";
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

export const tableList = styled.div`
    ${flexColumn}
    gap: 10px;
`

export const tableRow = styled.div`
    ${flexSpaceBetween}
    font-size: 14px;
`

export const span = styled.span<{ variant?: 'positive' | 'negative' }>`
    color: ${({ variant }) =>
        variant === 'positive' ? '#22c55e' :
            variant === 'negative' ? '#ef4444' :
                'inherit'};
`