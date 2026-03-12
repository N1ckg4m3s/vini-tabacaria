import React from 'react'
import { CartCard } from '../cartCard/component'
import * as s from './style'
import { CartProductUiFormat } from '../../types/HooksProps'

interface props {
    products: CartProductUiFormat[]
}

export const CartContent: React.FC<props> = ({ products }) => {
    return (<>
        <s.CartItens>
            {products.map((prod) => <CartCard
                Produto={prod}
                key={prod.product.id}
            />)}
        </s.CartItens>
    </>)
}