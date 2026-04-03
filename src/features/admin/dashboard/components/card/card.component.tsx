
import React from 'react'
import * as s from './style'
import { CardProps } from '../../types/components.types'

export const DashboardCard: React.FC<CardProps> = ({ title, value, obs }) => {
    return (
        <s.cardContainer>
            <s.cardTitle>{title}</s.cardTitle>
            <s.cardValue>{value || '-'}</s.cardValue>
            <s.cardObs>{obs}</s.cardObs>
        </s.cardContainer>
    )
}