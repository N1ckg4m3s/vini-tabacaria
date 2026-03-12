import { CartProductUiFormat, useCartProduct_Props } from "../types/HooksProps";
import { useCart } from "@/providers/cart.provider";

export const useCartProduct: useCartProduct_Props = () => {
    const {
        produtos,
        AumentarQuantidade,
        DiminuirQuantidade,
        DefinirQuantidade,
        removerProduto,
        AceitarMudancaDeStatus
    } = useCart()

    const cartProductsFormated: CartProductUiFormat[] = produtos.map(p => ({
        actions: {
            OnAumentarQuantidade: () => AumentarQuantidade(p.produto.id),
            OnDiminuiorQuantidade: () => DiminuirQuantidade(p.produto.id),
            OnRemover: () => removerProduto(p.produto.id),
            OnDefinirQuantidade: (value: number) => DefinirQuantidade(p.produto.id, value),
            onAcceptNewStatus: () => AceitarMudancaDeStatus(p.produto.id)
        },

        status: p.status,

        product: {
            ...p.produto,
            quantidade: p.quantidade,
            subTotal: p.subTotal,
        },
    }))

    return {
        cartProducts: cartProductsFormated,
        count: produtos.length
    }
}