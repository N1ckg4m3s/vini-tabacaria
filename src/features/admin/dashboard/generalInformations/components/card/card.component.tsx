'use client'

import React from 'react'
import * as s from './style'

interface CardProps {
    title: string;
    value: string | number;
    obs?: string;
}

export const DashboardCard: React.FC<CardProps> = ({ title, value, obs }) => {
    return (
        <s.cardContainer>
            <s.cardTitle>{title}</s.cardTitle>
            <s.cardValue>{value || '-'}</s.cardValue>
            <s.cardObs>{obs}</s.cardObs>
        </s.cardContainer>
    )
}

export const DashboardCardSkeleton = () => {
    return (
        <s.cardContainer>
            <s.skeletonTitle />
            <s.skeletonValue />
            <s.skeletonObs />
        </s.cardContainer>
    );
}