'use client'
import { useRouter } from 'next/navigation';
import * as s from './style';
import Cart from '@/assets/SmallCart.svg'

interface props {
    small?: boolean
}

/**
 * Componente de card de produto.
 * Contém informações sobre o produtos:
 * - Titulo
 * - Imagem
 * - Indicador se esta no carrinho
 * - Especificador/Sabor
 * - Valor
 *
 * - Future:
 *  Adicionar os dados do produto real, atualmente teste
 * 
 * @param {boolean} small -- indica se o card deve ser no tamanho reduzido
 * 
 * @component
 * @returns {JSX.Element}
*/
const ProductCard: React.FC<props> = ({ small }) => {
    /* Roteador para mudar de tela */
    const router = useRouter();

    /**
     * Redireciona o usuario para a pagina `informacao-produto`
     * passando o id para obter mais informações.
    */
    const handleRedirectToProductInfo = () => {
        router.push('/informacao-produto/[id]')
    }

    return <s.CardContainer onClick={handleRedirectToProductInfo}>
        <s.CardContainerIndicadorNoCarrinho>
            <Cart />
            <s.CardCarrinhoTextoIndicador>
                no Carrinho
            </s.CardCarrinhoTextoIndicador>
        </s.CardContainerIndicadorNoCarrinho>
        <s.CardImageContainer>
            <s.CardImage src={'/assets/NoImageAvaliable.png'} alt='Imagem do produto' />
            <s.CardValue>#,##$</s.CardValue>
        </s.CardImageContainer>
        <s.CardTitle>ZIGGY MIX</s.CardTitle>
        <s.CardEspecificacao>Morango e laranja</s.CardEspecificacao>
    </s.CardContainer>;
};

export default ProductCard;