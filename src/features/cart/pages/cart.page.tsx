'use client'

import { CartContent } from '../components/cartContent/component'
import { CartResume } from '../components/cartResume/component'
import { useCartProduct } from '../hooks/useCartProduct'
import * as s from './style'
import { LoadingOverlay } from '@/features/_shered/components/loading/component'

export const CartComponent = () => {
    const { loading } = useCartProduct()

    return (<>
        <s.CartPage>
            <s.CartHeader>
                <s.CartTitle>Carrinho</s.CartTitle>
                <s.CartItensCount>3 Itens</s.CartItensCount>
            </s.CartHeader>

            <s.ContentLayout>
                <CartContent/>
                <CartResume/>
            </s.ContentLayout>
        </s.CartPage>
        {loading && <LoadingOverlay />}
    </>)
}
