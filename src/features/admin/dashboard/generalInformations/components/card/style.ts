import styled from "styled-components";
import { GlobalColors } from "../../../../../../styles/theme";
import { flexColumn, skeletonEffect } from "../../../../../../styles/mixins";

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

// SKELETON //
export const skeletonTitle = styled.div`
    width: 80px;
    height: 16px;
    background: ${GlobalColors.Neutral[700]};
    border-radius: 4px;

    ${skeletonEffect};
`

export const skeletonValue = styled.div`
    width: 100%;
    height: 32px;
    background: ${GlobalColors.Neutral[700]};
    border-radius: 4px;

    ${skeletonEffect};
`

export const skeletonObs = styled.div`
    width: 100%;
    height: 16px;
    background: ${GlobalColors.Neutral[700]};
    border-radius: 4px;

    ${skeletonEffect};
`