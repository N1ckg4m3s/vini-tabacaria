import styled, { css } from "styled-components";
import { GlobalColors } from "../../../../../../styles/theme";
import { flexColumn, skeletonEffect } from "../../../../../../styles/mixins";

export const table = styled.div`
    ${flexColumn}
    gap: 5px;
    width: 100%;
    border-radius: 12px;
    background-color: ${GlobalColors.Neutral[800]};
`

export const tableHead = styled.div`
    width: 100%;
    height: 40px;
`

export const tableRow = styled.div<{ delay?: number, width?: number }>`
    ${skeletonEffect};
    width: ${({ width }) => width || 100}%;
    height: 40px;
    animation-delay: ${({ delay }) => delay || 0.5}s;
    margin-bottom: 5px;
    border-radius: 8px;
`