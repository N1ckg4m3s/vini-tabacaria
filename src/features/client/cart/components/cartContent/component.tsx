import React from 'react'
import { CartCard } from '../cartCard/component'
import * as s from './style'
import { CartProductUiFormat } from '../../types/HooksProps'

interface props {
    products: CartProductUiFormat[]
}

const BASES_COPY:any = {
    OnAumentarQuantidade: () => { },
    OnDiminuiorQuantidade: () => { },
    OnRemover: () => { },
    OnDefinirQuantidade: (value: number) => { },
    quantidade: 2,
    subTotal: 100,
}

const MOCK_PRODS: CartProductUiFormat[] = [
    {
        ...BASES_COPY,
        id: "1",
        marca: "Marca 1",
        nome: "Produto 1",
        status: "out_of_stock"
    },
    {
        ...BASES_COPY,
        id: "2",
        marca: "Marca 2",
        nome: "Produto 2",
        status: "price_changed"
    },
    {
        ...BASES_COPY,
        id: "3",
        marca: "Marca 3",
        nome: "Produto 3",
        status: "valid"
    },
]

export const CartContent: React.FC<props> = ({ products }) => {
    return (<>
        <s.CartItens>
            {MOCK_PRODS.map((prod) => <CartCard
                Produto={prod}
                key={prod.id}
            />)}
        </s.CartItens>
    </>)
}