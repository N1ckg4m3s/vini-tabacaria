'use client'

import { CartContent } from '../components/cartContent/component'
import { CartResume } from '../components/cartResume/component'
import { useCartProduct } from '../hooks/useCartProduct'
import { useCartResume } from '../hooks/useCartResume'
import { useFinalizeCart } from '../hooks/useFinalizeCart'
import * as s from './style'

export const CartComponent = () => {
    const { cartProducts, count } = useCartProduct()
    const { total, subTotal, entrega, limparCarrinho } = useCartResume()
    const { onFinalize } = useFinalizeCart()

    return (<>
        <s.CartPage>
            <s.CartHeader>
                <s.CartTitle>Carrinho</s.CartTitle>
                <s.CartItensCount>{count} Itens</s.CartItensCount>
            </s.CartHeader>

            <s.ContentLayout>
                <CartContent products={cartProducts} />
                <CartResume
                    entrega={entrega}
                    subTotal={subTotal}
                    total={total}
                    finalizeTrigger={onFinalize}
                    limparCarrinho={limparCarrinho}
                />
            </s.ContentLayout>
        </s.CartPage>
    </>)
}
