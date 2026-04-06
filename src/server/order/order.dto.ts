import { BadRequestError } from "../../http/error/erros.handle";
import { CartProduto } from "@/shered/shered.types";
import { DataBaseFormat } from "./order.types";

export const formatOrderItem = (produtoNoCarrinho: CartProduto, order_id: string): DataBaseFormat => {
    if (!order_id) throw new BadRequestError('Não teve orderId identificado');
    if (!produtoNoCarrinho) throw new BadRequestError('Produto não informado');

    if (!produtoNoCarrinho.produto.id) throw new BadRequestError('id [produto] não informado');
    if (!produtoNoCarrinho.quantidade) throw new BadRequestError('quantidade não informada');
    if (!produtoNoCarrinho.produto.valor) throw new BadRequestError('valor unitario não informada');

    return {
        order_id,
        product_id: produtoNoCarrinho.produto.id,
        quantity: produtoNoCarrinho.quantidade,
        unit_price: produtoNoCarrinho.produto.valor,
    }
}