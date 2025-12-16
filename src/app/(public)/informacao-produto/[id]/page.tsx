// 'use client';
// import * as s from './style'
// import { useParams } from 'next/navigation';
// import Carrinho from '@assets/cart.svg'
// import { ContainerPagina, HorizontalLine } from '@/styles/mixins';
// import { useEffect, useMemo, useRef, useState } from 'react';
// import ProductGrid2xN from '@/components/Cards/product-grid-2xN/component';
// import { Produto } from '@/controller/types';
// import { apiCaller } from '@/controller/apiCaller';
// import { obterInformacoesProduto, obterMarcaDoProduto } from '@/controller/produtoControllerAux';
import { ProductInfoComponent } from '@/features/productInfo/pages/productInfo.page';

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


const InformacaoProduto = () => {

    return <ProductInfoComponent />

    return;
    // /** informações do produto */
    // const [produto, setProduto] = useState<Produto | null>(null);

    // /** informações da quantidade para adicionar */
    // const [quantidade, setQuantidade] = useState<number>(1);

    // const { id } = useParams();

    // useEffect(() => {
    //     async function fetchProduto() {
    //         try {
    //             const data = await apiCaller({
    //                 url: '/api/produto/get-by-id',
    //                 params: { productId: String(id) }
    //             });

    //             console.log(data)

    //             setProduto(data || null);
    //         } catch (e) {
    //             console.error(`Erro ao buscar produto ${id} - ${e}`);
    //         }
    //     }
    //     fetchProduto();
    // }, [id]);

    // // Exemplo de useMemo para processar info só quando produto mudar
    // const { titulo, especificacao } = useMemo(() => {
    //     if (!produto) return { titulo: '', especificacao: '' };
    //     return obterInformacoesProduto(produto);
    // }, [produto]);

    // /** funções auxiliares para obter informações do produto */
    // const obterValorInt = () => (produto?.valor ?? 0);
    // const obterValor = () => (produto?.valor ?? 0).toFixed(2);
    // const obterImagem = () => (produto?.imagem && produto.imagem !== '') ? produto.imagem : '/assets/NoImageAvaliable.png';
    // const obterTipo = () => (produto?.tipo) ? produto.tipo : '';

    // /** Gera os dados de 'especificação' */
    // const gerarEspecificacao = (): string => {
    //     if (!produto || !produto.especificacao) return '';
    //     const especificacao = produto.especificacao;
    //     return JSON.stringify(especificacao);
    // };

    // /** Renderiza o uma tela de carregando */
    // if (!produto) return (
    //     <ContainerPagina $Column>
    //         loading ...
    //     </ContainerPagina>
    // );

    // return (
    //     <ContainerPagina $Column>

    //         <s.InformacaoContainer>
    //             <s.ImagemProduto src={obterImagem()} alt="Imagem do produto" />
    //             <s.DescricaoContainer>
    //                 <span>{titulo}</span>
    //                 <s.DescricaoProduto>{especificacao}</s.DescricaoProduto>
    //                 <s.ContainerJustfyArround>
    //                     <span>Valor Unitario</span>
    //                     <span>{obterValor()}$</span>
    //                 </s.ContainerJustfyArround>
    //                 <HorizontalLine />
    //                 <s.ContainerJustfyArround>
    //                     <s.QuantidadeInput
    //                         type="number"
    //                         min={1}
    //                         max={10}
    //                         value={quantidade}
    //                         onChange={(e) => setQuantidade(Number(e.target.value))}
    //                     />
    //                     <s.TextoSubTotal>{(obterValorInt() * quantidade).toFixed(2)}$</s.TextoSubTotal>
    //                 </s.ContainerJustfyArround>
    //                 <s.BotaoAdicionar>
    //                     <Carrinho />
    //                     <span>Adicionar</span>
    //                 </s.BotaoAdicionar>
    //             </s.DescricaoContainer>
    //         </s.InformacaoContainer>

    //         {/* Produtos da mesma marca */}
    //         <ProductGrid2xN
    //             key='itens-da-marca'
    //             titulo="Outras da mesma marca"
    //             urlData="/api/produto/get-by-relation/relation-marca"
    //             urlParams={{
    //                 productId: produto.id,
    //             }}
    //         />
    //         {/*Produtos relacionados */}
    //         <ProductGrid2xN
    //             key='itens-relacionados'
    //             titulo="Semelhantes"
    //             urlData="/api/produto/get-by-relation/relation-relactive"
    //             urlParams={{
    //                 productId: produto.id,
    //             }}
    //         />
    //     </ContainerPagina>
    // );
};


export default InformacaoProduto;