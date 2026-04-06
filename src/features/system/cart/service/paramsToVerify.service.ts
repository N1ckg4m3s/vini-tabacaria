import { Produto } from "@/shered/shered.types"

export const paramsToVerifyProducts = (produto: Produto): Partial<Produto> => {
    return {
        id: produto.id, // identificador do produto
        valor: produto.valor, // status de 'price_changed'
        // visible: produto.visible, // status de 'out_of_stock'
    }
}