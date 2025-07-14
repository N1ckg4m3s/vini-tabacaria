'use client';
import ProductCard from '../product-card/component';
import * as s from './style'

interface props {
    titulo: string;
    urlData: string;
}

/**
 * Container focado em obter as informações da api e mostrar em uma grade:
 * - 2 linhas
 * - N colunas
 * - Scroll horizontal
 * 
 * @param {string} Titulo - Titulo que o container vai ter
 * @param {string} urlData - Url da api que vai usar para chamar as informações
*/
const ProductGrid2xN: React.FC<props> = ({ titulo, urlData }) => {
    return (
        <s.GridContainer>
            <s.TituloGrid>{titulo}</s.TituloGrid>

            <s.ProductGridContainer>
                {
                    Array.from({ length: (1) }).map((_, index) => {
                        return <ProductCard key={`catalogItem-${index}`} small />
                    })
                }
            </s.ProductGridContainer>
        </s.GridContainer>
    );
};

export default ProductGrid2xN;
