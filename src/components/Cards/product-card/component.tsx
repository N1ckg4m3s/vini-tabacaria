'use client';
import { useRouter } from 'next/navigation';
import * as s from './style';
import Cart from '@/assets/SmallCart.svg';
import { Produto } from '@/controller/types';
import { obterInformacoesProduto } from '@/controller/produtoControllerAux';

interface props {
    small?: boolean;
    noCarrinho?: boolean;
    itemData: Produto;
}

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
