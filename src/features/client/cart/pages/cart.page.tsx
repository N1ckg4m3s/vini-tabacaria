'use client'

import { LoadingOverlay } from '@/_shered/components/loading/component'
import { CartContent } from '../components/cartContent/component'
import { CartResume } from '../components/cartResume/component'
import { useCartProduct } from '../hooks/useCartProduct'
import { useCartResume } from '../hooks/useCartResume'
import { useFinalizeCart } from '../hooks/useFinalizeCart'
import * as s from './style'

export const CartComponent = () => {
    const { cartProducts, count } = useCartProduct()
    const { total, subTotal, limparCarrinho } = useCartResume()
    const { onFinalize, loading } = useFinalizeCart()

    return (<>
        <s.CartPage>
            {loading && <LoadingOverlay />}
            <s.CartHeader>
                <s.CartTitle>Carrinho</s.CartTitle>
                <s.CartItensCount>{count} Itens</s.CartItensCount>
            </s.CartHeader>

            <s.ContentLayout>
                <CartContent products={cartProducts} />
                <CartResume
                    subTotal={subTotal}
                    total={total}
                    finalizeTrigger={onFinalize}
                    limparCarrinho={limparCarrinho}
                />
            </s.ContentLayout>
        </s.CartPage>
    </>)
}
