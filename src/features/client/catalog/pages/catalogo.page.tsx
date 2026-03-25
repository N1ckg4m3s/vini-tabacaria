'use client'

import * as s from './style';
import { useEffect, useState } from "react"
import { useCatalogFilters } from "../hooks/useCatalogFilter"
import { useCatalogProducts } from "../hooks/useCatalogProducts"
import { FiltroCatalogoComponent } from '../components/filter/component';
import { useResponsiveColumns } from '../../../_shered/hooks/useResponsiveColuns';
import ProductCard from '../../../_shered/components/productCard/component';
import PaginacaoComponente from '../../../_shered/components/PaginacaoComponent/component';
import { LoadingOverlay } from '../../../_shered/components/loading/component';

export const CatalogoComponent = () => {
    const { source, selected, loading, actions } = useCatalogFilters()

    const [filterOppened, setFilterOppened] = useState(false)
    const [paginaAtual, setPaginaAtual] = useState(1)

    const { containerRef, totalItensNaTela } = useResponsiveColumns({})

    const { catalogProducts, totalPages } = useCatalogProducts({
        filtros: selected,
        paginaAtual,
        numeroPorPagina: totalItensNaTela,
    })

    useEffect(() => { setPaginaAtual(1) }, [source])

    return (
        <s.CatalogoContainer>
            {/* Botão para abrir o filtro */}

            <s.openCatalogContainer>
                <s.openCatalogButton
                    onClick={() => setFilterOppened(!filterOppened)}
                >
                    Filtros
                </s.openCatalogButton>
            </s.openCatalogContainer>

            <FiltroCatalogoComponent
                oppened={filterOppened}
                source={source}
                actions={actions}
            />

            <s.CatalogoPaginationContainer ref={containerRef}>
                <s.ItensContainer>
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