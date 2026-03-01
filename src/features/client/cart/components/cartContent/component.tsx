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
                key={prod.id}
                Marca={prod.marca}
                Nome={prod.nome}
                Image={prod.imagme}
                OnAumentarQuantidade={prod.OnAumentarQuantidade}
                OnDefinirQuantidade={(v: number) => prod.OnDefinirQuantidade(v)}
                OnDiminuiorQuantidade={prod.OnDiminuiorQuantidade}
                OnRemover={prod.OnRemover}
                Quantidade={prod.quantidade}
                SubTotal={prod.subTotal}
            />)}
        </s.CartItens>
    </>)
}