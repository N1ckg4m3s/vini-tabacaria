'use client'

import { useState } from 'react'
import { useResponsiveColumns } from '@/_shered/hooks/useResponsiveColuns'
import { OrderCardResume } from '../components/orderCard/component'
import { OrderSection } from '../types/type'
import * as s from './style'
import PaginacaoComponente from '@/_shered/components/PaginacaoComponent/component'
import { useChangeTab } from '../hook/useChangeTab'

interface props {
    OrdersSections: OrderSection[],
    tabSelected: 'processing' | 'finished'
    pagination: {
        page: number,
        limit: number,
        total: number,
        totalPages: number
    }
}

export const OrderList: React.FC<props> = ({ OrdersSections, tabSelected, pagination }) => {
    const [page, setPage] = useState(1)
    const { containerRef, totalItensNaTela } = useResponsiveColumns({ CARD_MIN_WIDTH: 280 })
    const { changeToTab } = useChangeTab({ actualTab: tabSelected, limit: totalItensNaTela })

    return (
        <s.pageContainer ref={containerRef}>
            <s.pageTitle>Pedidos</s.pageTitle>

            <s.tabContainer>
                <s.tabButton
                    actived={tabSelected == 'processing'}
                    onClick={() => changeToTab('processing')}

                > Processando </s.tabButton>
                <s.tabButton
                    actived={tabSelected == 'finished'}
                    onClick={() => changeToTab('finished')}

                > Completo </s.tabButton>
            </s.tabContainer>
            {
                OrdersSections.map((section, sectionIndex) =>
                    section.orderList.length <= 0 &&
                    <></> ||
                    <s.sectionContainer key={`section-${sectionIndex}`}>
                        <s.sectionTittle>{section.sectionTitle}</s.sectionTittle>
                        <s.cardGrid>
                            {
                                section.orderList
                                    .slice(0, totalItensNaTela)
                                    .map((o) => <OrderCardResume key={o.id} order={o} />)
                            }
                        </s.cardGrid>
                    </s.sectionContainer>
                )
            }
            <PaginacaoComponente
                numeroDePaginas={pagination.totalPages}
                paginaAtual={page}
                changeTo={(page) => setPage(page)}
            />
        </s.pageContainer>
    )
}