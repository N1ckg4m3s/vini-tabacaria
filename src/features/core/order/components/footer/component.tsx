'use client'

import { formatePrice } from '@/features/_shered/services/formaters/price.formater'
import * as s from './style'

interface props { total: number }

export const OrderFooter: React.FC<props> = ({ total }) => {
    return (
        <s.TotalContainer>
            <s.Span>Total</s.Span>
            <s.TotalValue>{formatePrice(total)}</s.TotalValue>
        </s.TotalContainer>
    )
}