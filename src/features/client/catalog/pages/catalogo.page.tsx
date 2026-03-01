'use client'

import * as s from './style';
import { useEffect, useState } from "react"
import { useAppliedFilters } from "../hooks/useAppliedFilters"
import { useCatalogFilters } from "../hooks/useCatalogFilter"
import { useResponsiveColumns } from "../hooks/useResponsiveColuns"
import { useCatalogProducts } from "../hooks/useCatalogProducts"
import { FiltroCatalogoComponent } from '../components/filter/component';
import { LoadingOverlay } from '@/features/_shered/components/loading/component';
import ProductCard from '@/features/_shered/components/productCard/component';
import PaginacaoComponente from '@/features/_shered/components/PaginacaoComponent/component';

export const CatalogoComponent = () => {
    const { filters, actions } = useAppliedFilters()
    const { source, loading } = useCatalogFilters(filters)
    const [paginaAtual, setPaginaAtual] = useState(1)

    const { containerRef, totalItensNaTela } = useResponsiveColumns({})

    const { catalogProducts, totalPages } = useCatalogProducts({
        filtros: filters,
        paginaAtual,
        numeroPorPagina: totalItensNaTela,
    })

    useEffect(() => {
        setPaginaAtual(1)
    }, [totalItensNaTela, filters])

    return (
        <s.CatalogoContainer>
            <FiltroCatalogoComponent
                source={source!}
                applied={filters}
                actions={actions}
            />

            <s.CatalogoPaginationContainer>
                <s.ItensContainer ref={containerRef}>
                    {catalogProducts.map(item => (
                        <ProductCard
                            key={item.id}
                            itemData={item}
                        />
                    ))}
                </s.ItensContainer>

                <PaginacaoComponente
                    changeTo={setPaginaAtual}
                    numeroDePaginas={totalPages}
                    paginaAtual={paginaAtual}
                />
            </s.CatalogoPaginationContainer>
            {loading && (<LoadingOverlay />)}
        </s.CatalogoContainer>
    )
}