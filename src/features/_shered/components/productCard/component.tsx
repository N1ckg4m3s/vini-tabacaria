'use client';
import { useRouter } from 'next/navigation';
import * as s from './style';
import Cart from '@/assets/SmallCart.svg';
import { obterInformacoesDoProduto } from '../../utils/obterInformacoesDoProduto';
import { Produto } from '@/shered/shered.types';
import { formatePrice } from '../../services/formaters/price.formater';
import { useCart } from '@/providers/cart.provider';

interface props {
    small?: boolean;
    itemData: Produto;
}

/**
 * Componente de card de produto.
 * @component
 * @returns {JSX.Element}
 */
const ProductCard: React.FC<props> = ({ small, itemData }) => {
    const { verificarProduto } = useCart()
    const router = useRouter();

    const { titulo, especificacao } = obterInformacoesDoProduto(itemData);
    const Imagem = itemData.imagem || '/assets/NoImageAvaliable.png';

    const noCarrinho = verificarProduto(itemData.id)

    const handleRedirectToProductInfo = () => router.push(`/informacao-produto/${itemData.id}`);

    return (
        <s.CardContainer onClick={handleRedirectToProductInfo} $small={small ? 'sim' : ''}>
            <s.CardContainerIndicadorNoCarrinho $noCarrinho={noCarrinho ? 'sim' : ''}>
                <Cart />
                <s.CardCarrinhoTextoIndicador> no Carrinho </s.CardCarrinhoTextoIndicador>
            </s.CardContainerIndicadorNoCarrinho>
            <s.CardImageContainer>
                <s.CardImage src={Imagem} alt="Imagem do produto" />
                <s.CardValue>{formatePrice(itemData.valor)}</s.CardValue>
            </s.CardImageContainer>
            <s.CardTitle>{titulo}</s.CardTitle>
            <s.CardEspecificacao>{especificacao}</s.CardEspecificacao>
        </s.CardContainer>
    );
};

export default ProductCard;
