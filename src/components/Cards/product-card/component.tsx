'use client';
import { useRouter } from 'next/navigation';
import * as s from './style';
import Cart from '@/assets/SmallCart.svg';
import { Produto, ProdutoAcessorio, ProdutoEssencia, ProdutoOutros } from '@/controller/types';
import { isProdutoAcessorio, isProdutoCarvaoAluminio, isProdutoEssencia } from '@/controller/utilits';

interface props {
    small?: boolean;
    noCarrinho?: boolean;
    itemData: Produto;
}

/**
 * Função para obter o título e a especificação do produto com base no tipo.
 * @returns {titulo: string, especificacao: string}
 */
const obterInformacoesProduto = (itemData: Produto): { titulo: string; especificacao: string } => {
    const produto = itemData as Produto;
    const marca = produto.marca ?? '';
    const nome = produto.nome ?? '';
    let titulo = '-//-';
    let especificacao = '';

    if (isProdutoEssencia(itemData)) {
        titulo = `${marca} ${nome}`;
        especificacao = itemData.especificacao.sabor;
    } else if (isProdutoCarvaoAluminio(itemData)) {
        titulo = marca;
        especificacao = nome;
    } else if (isProdutoAcessorio(itemData)) {
        titulo = itemData.especificacao.tipo;
        especificacao = `${itemData.especificacao.cor} ${itemData.especificacao.tamanho}`;
    } else if (itemData.tipo === 'outros') {
        titulo = itemData.marca ?? '';
        especificacao = `${itemData.especificacao.tipo}`;
    }

    return { titulo, especificacao };
};

/**
 * Componente de card de produto.
 * @component
 * @returns {JSX.Element}
 */
const ProductCard: React.FC<props> = ({ small, noCarrinho, itemData }) => {
    const router = useRouter();

    const produto = itemData as Produto;
    const { titulo, especificacao } = obterInformacoesProduto(itemData);

    const obterValor = (): string => (produto.valor ?? 0).toFixed(2);

    const obterImagem = (): string => (produto.imagem && produto.imagem !== '') ? produto.imagem : '/assets/NoImageAvaliable.png';

    const handleRedirectToProductInfo = () => router.push(`/informacao-produto/${produto.id}`);

    return (
        <s.CardContainer onClick={handleRedirectToProductInfo} $small={small ? 'sim' : ''}>
            <s.CardContainerIndicadorNoCarrinho $noCarrinho={noCarrinho ? 'sim' : ''}>
                <Cart />
                <s.CardCarrinhoTextoIndicador> no Carrinho </s.CardCarrinhoTextoIndicador>
            </s.CardContainerIndicadorNoCarrinho>
            <s.CardImageContainer>
                <s.CardImage src={obterImagem()} alt="Imagem do produto" />
                <s.CardValue>{obterValor()}$</s.CardValue>
            </s.CardImageContainer>
            <s.CardTitle>{titulo}</s.CardTitle>
            <s.CardEspecificacao>{especificacao}</s.CardEspecificacao>
        </s.CardContainer>
    );
};

export default ProductCard;
