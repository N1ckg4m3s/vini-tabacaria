'use client'

import { useCart } from '@/providers/cart.provider';
import { Produto } from '@/shered/shered.types';
import { QuantityControl } from '@/_shered/components/quantityControl/component';
import * as s from './style'

interface Props {
    produto?: Produto
}

export const ProductClientActions: React.FC<Props> = ({ produto }) => {
    const {
        obterQuantidade,
        verificarProduto,
        adicionarProduto,
        AumentarQuantidade,
        DiminuirQuantidade,
        DefinirQuantidade,
    } = useCart()

    if (!produto) return <s.BotaoCompra disabled>—</s.BotaoCompra>;

    const quantidade = obterQuantidade(produto.id)

    const noCarrinho = verificarProduto(produto.id)

    if (!noCarrinho) {
        return (
            <s.BotaoCompra onClick={() => adicionarProduto(produto)}>
                Adicionar ao carrinho
            </s.BotaoCompra>
        )
    }

    return (
        <s.QuantityContainer>
            <QuantityControl
                quantidade={quantidade}
                onAumentar={() => AumentarQuantidade(produto.id)}
                onDiminuir={() => DiminuirQuantidade(produto.id)}
                onDefinir={(valor: number) => DefinirQuantidade(produto.id, valor)}
            />
        </s.QuantityContainer>
    )
}
