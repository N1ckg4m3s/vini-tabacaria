'use client'

import * as s from './funil.style'

interface props {
    title: string,
    value: number,
}

export const FunilStep: React.FC<props> = ({ title, value }) => {
    return (
        <s.stepContainer>
            <s.stepLabel>{title}</s.stepLabel>
            <s.stepValue>{value}</s.stepValue>
        </s.stepContainer>
    )
}

export const FunilStepSkeleton = () => {
    return (
        <s.stepContainer>
            <s.stepSkeletonLabel />
            <s.stepSkeletonValue />
        </s.stepContainer>
    );
};