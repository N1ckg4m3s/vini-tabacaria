'use client'

import * as s from './style';
import { useEffect, useState } from "react"
import { useAppliedFilters } from "../hooks/useAppliedFilters"
import { useCatalogFilters } from "../hooks/useCatalogFilter"
import { useResponsiveColumns } from "../hooks/useResponsiveColuns"
import { useCatalogProducts } from "../hooks/useCatalogProducts"
import ProductCard from '../components/ProductCard/component';
import PaginacaoComponente from '../components/PaginacaoComponent/component';
import { FiltroCatalogoComponent } from '../components/filter/component';

export const CatalogoComponent = () => {
    const { source, loading } = useCatalogFilters()
    const { filters, actions } = useAppliedFilters()
    const [paginaAtual, setPaginaAtual] = useState(1)

    const { containerRef, totalItensNaTela } = useResponsiveColumns({ numeroDeLinhas: 5 })

    const { catalogProducts, totalPages } = useCatalogProducts({
        filtros: filters,
        paginaAtual,
        numeroPorPagina: totalItensNaTela,
    })

    useEffect(() => {
        setPaginaAtual(1)
    }, [totalItensNaTela, filters])

    if (loading) return <span>Loading...</span>

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
                            noCarrinho={false}
                        />
                    ))}
                </s.ItensContainer>

                <PaginacaoComponente
                    changeTo={setPaginaAtual}
                    numeroDePaginas={5}
                    paginaAtual={paginaAtual}
                />
            </s.CatalogoPaginationContainer>
        </s.CatalogoContainer>
    )
}