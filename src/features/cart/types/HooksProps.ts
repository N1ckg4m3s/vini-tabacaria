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
type useCartResume_Params = { id: string, relacao: "marca" | "relevancia" }
type useCartResume_Respose = { products: Produto[], loading: boolean }

export type useCartResume_Props = (params: useCartResume_Params) => useCartResume_Respose

// ------------------------
// NO NAME
// ------------------------
type NO_NAME_Params = {}

type NO_NAME_Respose = {}

export type NO_NAME_Props = (params: NO_NAME_Params) => NO_NAME_Respose