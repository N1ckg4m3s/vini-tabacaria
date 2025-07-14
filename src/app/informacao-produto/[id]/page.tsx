'use client';
import * as s from './style'
import { useParams } from 'next/navigation';
import Carrinho from '@assets/cart.svg'
import { ContainerPagina } from '@/styles/mixins';
import { useRef, useState } from 'react';
import ProductGrid2xN from '@/components/product-grid-2xN/component';

/**
 * Esta página exibe informações detalhadas do produto passado na URL, incluindo:
 * - Imagem
 * - Nome
 * - Especificações (nome, cor, etc.)
 * - Valor
 * - Possibilidade de adicionar no carrinho
 * 
 * Também pode mostrar:
 * - Itens semelhantes ou relacionados (com base na marca ou cor)
 * 
 * Funcionalidades possíveis de expansão:
 * - Modificar a quantidade do produto no carrinho, caso já tenha sido adicionado
 * - Remover do carrinho
 * 
 * @component
 * @param {string} id - O ID do produto a ser exibido.
 */

/* Meta data para modificação do titulo da pagina (não funciona dentro de 'use client')
    export const metadata = {
        title: '[TITULO DA PAGINA]', 
    }
*/

const InformacaoProduto = () => {
    /* referenciar o input da quantidade */
    const [quantidade, setQuantidade] = useState<number>(1)

    const testValue: number = 9.50

    const { id } = useParams();
    return (
        <ContainerPagina $Column>
            <s.InformacaoContainer>
                <s.ImagemProduto src={'/assets/NoImageAvaliable.png'} alt='Imagem do produto' />
                <s.DescricaoContainer>
                    <span>[TITULO]</span>
                    <s.DescricaoProduto>[DESC.]</s.DescricaoProduto>
                    <s.ContainerJustfyArround>
                        <span>Valor Unitario</span>
                        <span>{testValue.toFixed(2)}$</span>
                    </s.ContainerJustfyArround>
                    <s.line />
                    <s.ContainerJustfyArround>
                        <s.QuantidadeInput
                            type='number'
                            min={1}
                            max={10}
                            value={quantidade}
                            onChange={(e) => { setQuantidade(Number.parseFloat(e.target.value)) }}
                        />
                        <s.TextoSubTotal> {(testValue * quantidade).toFixed(2)}$ </s.TextoSubTotal>
                    </s.ContainerJustfyArround>
                    <s.BotaoAdicionar>
                        <Carrinho />
                        <span>Adicionar</span>
                    </s.BotaoAdicionar>

                </s.DescricaoContainer>
            </s.InformacaoContainer>

            <ProductGrid2xN
                titulo='Outras da mesma marca'
                urlData='Url teste'
            />

            <ProductGrid2xN
                titulo='Semelhantes'
                urlData='Url teste'
            />
        </ContainerPagina>
    );
};

export default InformacaoProduto;