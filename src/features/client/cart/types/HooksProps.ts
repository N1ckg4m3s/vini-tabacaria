// ------------------------
// Use products parametros

import { CartItemStatus } from "@/shered/shered.types"

// ------------------------
export type CartProductUiFormat = {
    id: string
    nome: string
    marca: string
    image?: string
    quantidade: number
    subTotal: number
    OnAumentarQuantidade: () => void
    OnDiminuiorQuantidade: () => void
    OnDefinirQuantidade: (value: number) => void
    OnRemover: () => void

    status: CartItemStatus
}

type useCartProduct_Respose = {
    cartProducts: CartProductUiFormat[]
    count: number
}

export type useCartProduct_Props = () => useCartProduct_Respose

// ------------------------
// Use relativos parametros
// ------------------------
type useCartResume_Respose = {
    subTotal: number,
    entrega: number,
    total: number
    limparCarrinho: () => void
}

export type useCartResume_Props = () => useCartResume_Respose

// ------------------------
// use finalize
// ------------------------
type useFinalize_Respose = {
    onFinalize: () => void
}

export type useFinalize_Props = () => useFinalize_Respose