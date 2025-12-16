'use client'

import { useParams } from 'next/navigation'
import { ProductBaseInformations } from '../components/ProductBaseInformations/component'
import { ProductCarousel } from '../components/ProductCarousel/component'
import * as s from './style'
import { useProduct } from '../hooks/useProduto'
import { useRelactivesProduct } from '../hooks/useProdutosRelativos'
import { LoadingOverlay } from '@/features/_shered/components/loading/component'

export const ProductInfoComponent = () => {
    const { id } = useParams()
    const { product, loading } = useProduct({ id: String(id) })
    const { products: relativoRelevancia } = useRelactivesProduct({ id: String(id), relacao: 'relevancia' })
    const { products: relativoMarca } = useRelactivesProduct({ id: String(id), relacao: 'marca' })

    return (<>
        <ProductBaseInformations produto={product} />

        <s.ProductRelations>
            <ProductCarousel
                tilte='Produtos da marca'
                produtos={relativoMarca}
            />
            <ProductCarousel
                tilte='Produtos Relativos'
                produtos={relativoRelevancia}
            />
        </s.ProductRelations>

        {loading && <LoadingOverlay />}
    </>)
}
