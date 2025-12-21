'use client'

import { CartContent } from '../components/cartContent/component'
import { CartResume } from '../components/cartResume/component'
import { useCartProduct } from '../hooks/useCartProduct'
import { useCartResume } from '../hooks/useCartResume'
import * as s from './style'

export const CartComponent = () => {
    const { cartProducts, count } = useCartProduct()
    const { total, subTotal, entrega } = useCartResume()

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
                />
            </s.ContentLayout>
        </s.CartPage>
    </>)
}
