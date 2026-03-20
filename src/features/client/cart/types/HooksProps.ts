import { CartProduto, Produto } from "../../../../shered/shered.types"

// ------------------------
// Use products parametros
// ------------------------

type necessaryPruductsInformationOnCart = Omit<Produto, 'tipo'> & { quantidade: number }

type necessaryProductActions = {
    OnAumentarQuantidade: () => void
    OnDiminuiorQuantidade: () => void
    OnDefinirQuantidade: (value: number) => void
    OnRemover: () => void
    onAcceptNewStatus: () => void
}

export type CartProductUiFormat = Pick<CartProduto, 'status'> & {
    product: necessaryPruductsInformationOnCart,
    actions: necessaryProductActions
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
    total: number
    limparCarrinho: () => void
}

export type useCartResume_Props = () => useCartResume_Respose

// ------------------------
// use finalize
// ------------------------
type useFinalize_Respose = {
    onFinalize: () => void,
    loading: boolean
}

export type useFinalize_Props = () => useFinalize_Respose