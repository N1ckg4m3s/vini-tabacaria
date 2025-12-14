'use client';
import { useRouter } from 'next/navigation';
import * as s from './style';
import Cart from '@/assets/SmallCart.svg';
import { obterInformacoesDoProduto } from '../../helpers/obterInformacoesDoProduto';
import { Produto } from '@/shered/shered.types';

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

    const { titulo, especificacao } = obterInformacoesDoProduto(itemData);

    const obterValor = (): string => (itemData.valor ?? 0).toFixed(2);

    const obterImagem = (): string => (itemData.imagem && itemData.imagem !== '') ? itemData.imagem : '/assets/NoImageAvaliable.png';

    const handleRedirectToProductInfo = () => router.push(`/informacao-produto/${itemData.id}`);

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
