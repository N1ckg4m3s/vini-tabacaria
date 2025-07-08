'use client'

import ProductCard from "@/components/product-card/component";

/**
 * Esse component exibe o conteúdo do catalogo da loja, incluindo:
 * - Lista dos itens em grande
 * - Cards com:
 *      - imagem
 *      - nome
 *      - especificação / nome
 *      - valor
 * 
 * Ele pode ser expandido para incluir funcionalidades como:
 * - Filtrar itens com base em:
 *      - marca
 *      - tamanho
 *      - * alguma espeficicação * 
*/

const CatalogoComponent = () => {
    return (
        <div>
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
        </div>
    )
};

export default CatalogoComponent;
