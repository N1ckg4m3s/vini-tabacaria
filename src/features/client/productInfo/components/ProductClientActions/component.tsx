'use client'

import { Produto } from '@/shered/shered.types'
import * as s from './style'
import { useCart } from '@/providers/cart.provider'
import { QuantityControl } from '@/features/_shered/components/quantityControl/component'

interface Props {
    produto?: Produto
}

export const ProductClientActions: React.FC<Props> = ({ produto }) => {
    if (!produto) return <s.BotaoCompra disabled>—</s.BotaoCompra>;

    const {
        verificarProduto,
        adicionarProduto,
        AumentarQuantidade,
        DefinirQuantidade,
        DiminuirQuantidade,
        obterQuantidade
    } = useCart()

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
