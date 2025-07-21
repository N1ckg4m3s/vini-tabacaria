'use client'
import { ChangeEventHandler, useRef, useState } from 'react';
import * as s from './style'
import { VerticalLine } from '@/styles/mixins';

interface props {
    Titulo: string;
    Especificacao?: string;
    Quantidade: number;
    ValorUnitario: number;
}

/**
 * Componente para gerar uma notificação
 * 
 * @param {string} Titulo - Titulo do item do carrinho
 * @param {string} Especificacao - Especificação do produto (cor, tamanho, sabor...)
 * @param {number} Quantidade - Quantidade inicial
 * @param {number} ValorUnitario - Valor unitario do produto
 *
 * @component
 * @returns {JSX.Element}
*/
const CarrinhoCardItemComponent: React.FC<props> = ({ Titulo, Especificacao, Quantidade, ValorUnitario }) => {
    const [quantidade, setQuantidade] = useState<number>(Quantidade ?? 1)

    const gerarSubTotal = (): number => {
        // Se não tiver algum numero retorna 0
        if (Number.isNaN(quantidade)) return 0;

        return (quantidade * ValorUnitario);
    };

    const handleChangeValue = (newValue: number) => {
        if (newValue <= 0) {
            // perguntar se quer remover
            return;
        }
        if (newValue > 10) {
            // limitar a quantidade
            return;
        }

        setQuantidade(newValue ?? 0)
    }

    return (
        <s.CardContainer>
            <s.ItemInformationsContainer>
                <s.TitleContainer>
                    <s.ItemTitle>{Titulo}</s.ItemTitle>
                    <s.ItemEspecification>{Especificacao}</s.ItemEspecification>
                </s.TitleContainer>
                <s.ItemQuantity
                    name={`quantidade de itens para o ${Titulo}`}
                    type='number'
                    min={0}
                    max={10}
                    value={quantidade}
                    onChange={(e) => { handleChangeValue(parseInt(e.target.value)) }}
                />
            </s.ItemInformationsContainer>
            <VerticalLine />

            <s.ValueContainer>
                <s.SubTotalValue>{`R$: ${gerarSubTotal().toFixed(2)}`}</s.SubTotalValue>
                <s.UnitaryValue>{`R$: ${ValorUnitario.toFixed(2)}`}</s.UnitaryValue>
            </s.ValueContainer>
        </s.CardContainer>
    );
}

export default CarrinhoCardItemComponent