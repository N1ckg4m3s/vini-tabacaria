
import React from 'react'
import * as s from './style'
import { CardProps } from '../../types/components.types'

export const DashboardCard: React.FC<CardProps> = ({ title, metric, sub }) => {
    return (
        <s.cardContainer>
            <s.cardTitle>{title}</s.cardTitle>
            <s.cardMetric>{metric || '-'}</s.cardMetric>
            <s.cardSub>{sub}</s.cardSub>
        </s.cardContainer>
    )
}