import { CartProduto } from "@/shered/shered.types";

export const acceptNewStatus = (cartProduto: CartProduto): CartProduto => {
    const { produto, status } = cartProduto

    if (status.type === 'price_changed') {
        produto.valor = status.metadata.newPrice!
    }

    return {
        ...cartProduto, // Copiar outros dados
        produto,
        status: {
            type: 'valid',
            metadata: {}
        }
    };
}