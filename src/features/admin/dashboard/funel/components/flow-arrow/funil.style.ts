import styled from "styled-components";
import { flexCenter, skeletonEffect } from "../../../../../../styles/mixins";
import { GlobalColors } from "../../../../../../styles/theme";

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

// SKELETON //
export const skeletonPorcent = styled.div`
    width: 40px;
    height: 16px;
    background: ${GlobalColors.Neutral[700]};
    border-radius: 4px;
    
    ${skeletonEffect}
`