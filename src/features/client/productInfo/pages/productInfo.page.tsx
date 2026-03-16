'use client'

import { useParams } from 'next/navigation'
import { ProductBaseInformations } from '../components/ProductBaseInformations/component'
import { ProductCarousel } from '../components/ProductCarousel/component'
import * as s from './style'
import { useObterProdutoPorId } from '../../../_shered/hooks/useObterProdutoPorId'
import { useRelactivesProduct } from '../hooks/useProdutosRelativos'
import { LoadingOverlay } from '@/features/_shered/components/loading/component'
import { useEffect } from 'react'
import { notifyProductViewed } from '@/features/system/analytics/services/notifyProductViewd'

export const ProductInfoComponent = () => {
    const { id } = useParams()
    const { product, loading } = useObterProdutoPorId({ id: String(id) })
    const { products: relativoRelevancia } = useRelactivesProduct({ id: String(id), relacao: 'relevancia' })
    const { products: relativoMarca } = useRelactivesProduct({ id: String(id), relacao: 'marca' })

    useEffect(() => {
        if (loading || !product) return;
        notifyProductViewed(product.id)
    }, [id, product?.id, loading])

    return (
        <s.Container>
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
        </s.Container>
    )
}
