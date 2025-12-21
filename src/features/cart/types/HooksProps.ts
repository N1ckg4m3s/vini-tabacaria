import { Produto } from "@/shered/shered.types"

// ------------------------
// Use products parametros
// ------------------------
export type CartProductUiFormat = {
    id: string
    nome: string
    marca: string
    imagme?: string
    quantidade: number
    subTotal: number
    OnAumentarQuantidade: () => void
    OnDiminuiorQuantidade: () => void
    OnDefinirQuantidade: (value: number) => void
    OnRemover: () => void
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
}

export type useCartResume_Props = () => useCartResume_Respose

// ------------------------
// NO NAME
// ------------------------
type NO_NAME_Params = {}

type NO_NAME_Respose = {}

export type NO_NAME_Props = (params: NO_NAME_Params) => NO_NAME_Respose