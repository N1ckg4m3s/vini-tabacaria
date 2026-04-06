import styled from "styled-components";
import { flexCenter, skeletonEffect } from "@/styles/mixins";
import { GlobalColors } from "@/styles/theme";

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

// SKELETON //

export const stepSkeletonValue = styled.div`
    width: 60px;
    height: 16px;
    background: ${GlobalColors.Neutral[700]};
    border-radius: 4px;
    margin-top: 8px;

    ${skeletonEffect};
`

export const stepSkeletonLabel = styled.div`
    width: 80px;
    height: 16px;
    background: ${GlobalColors.Neutral[700]};
    border-radius: 4px;

    ${skeletonEffect};
`