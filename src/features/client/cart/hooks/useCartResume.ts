import { useCart } from "../../../../providers/cart.provider"
import { useCartResume_Props } from "../types/HooksProps"

export const useCartResume: useCartResume_Props = () => {
    const { total, limparCarrinho } = useCart()

    const handleLimparCarrinho = () => {
        const confirmar = window.confirm("Realmente deseja limpar seu carrinho?")
        if (confirmar) limparCarrinho();
    }

    return {
        subTotal: total,
        total: total,
        limparCarrinho: handleLimparCarrinho
    }
}