'use client'

import * as s from './funil.style'

interface props {
    porcent: number,
}

export const FunilFlowStep: React.FC<props> = ({ porcent }) => {
    return (
        <s.flowContainer>
            <s.flowArrow >—</s.flowArrow>
            <s.flowPorcent>{porcent}%</s.flowPorcent>
            <s.flowArrow >→</s.flowArrow>
        </s.flowContainer>
    )
}

export const FunilFlowStepSkeleton = () => {
    return (
        <s.flowContainer>
            <s.flowArrow >—</s.flowArrow>
            <s.skeletonPorcent />
            <s.flowArrow >→</s.flowArrow>
        </s.flowContainer>
    )
}