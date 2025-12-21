import { CartProductUiFormat, useCartProduct_Props } from "../types/HooksProps";
import { useCart } from "@/providers/cart.provider";

export const useCartProduct: useCartProduct_Props = () => {
    const {
        produtos,
        AumentarQuantidade,
        DiminuirQuantidade,
        DefinirQuantidade,
        removerProduto,
    } = useCart()

    const cartProductsFormated: CartProductUiFormat[] = produtos.map(p => ({
        id: p.produto.id,
        marca: p.produto.marca,
        nome: p.produto.nome,
        quantidade: p.quantidade,
        subTotal: p.subTotal,
        imagem: p.produto.imagem,
        OnAumentarQuantidade: () => AumentarQuantidade(p.produto.id),
        OnDiminuiorQuantidade: () => DiminuirQuantidade(p.produto.id),
        OnRemover: () => removerProduto(p.produto.id),
        OnDefinirQuantidade: (value: number) => DefinirQuantidade(p.produto.id, value),
    }))

    return {
        cartProducts: cartProductsFormated,
        count: produtos.length
    }
}