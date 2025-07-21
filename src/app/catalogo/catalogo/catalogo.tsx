'use client'
import PaginacaoComponente from '@/components/CatalogComponents/paginacao-component/component';
import * as s from './style'
import ProductCard from "@/components/Cards/product-card/component";
import { useEffect, useRef, useState } from "react";

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
    /* os dados dos cards vão estar disponiveis por Redux para melhor acesso */

    /* Referencia o container para ajusta a quantidade com base na tela */
    const containerRef = useRef<HTMLDivElement>(null)

    /* Referencia a quantidade de colunas sem atualizar todo o conteudo */
    const [numeroDeColunas, setNumeroDeColunas] = useState(0);

    /* Paginação */
    const [paginaAtual, setPaginaAtual] = useState<number>(0);
    const [paginaQuantidade, setPaginaQuantidade] = useState<number>(0);

    const numeroDeLinhas: number = 5;

    /* useEffect para o rezise */
    useEffect(() => {
        /**
         * Atualiza a quantidade de itens na tela com base no espaço que tem
         * mantendo sempre a quantidade certa para cada tela
         * 
         * A quantidade de linhas esta sendo definido para 5  
        */
        const handleResize = () => {
            if (containerRef.current) {
                /* tamanho do container */
                const actualWidth: number = containerRef.current.clientWidth;
                /* Tamanho minimo do card */
                const minSize: number = 150;
                /* Espaçamento entre os cards */
                const gapSize: number = 16;

                const novoNumeroDeColunas: number = Math.floor((actualWidth + gapSize) / (minSize + gapSize))

                /* Atualizar apenas se os valores forem diferentes evitando atualizações desnecessarias */
                if (numeroDeColunas != novoNumeroDeColunas) {
                    setNumeroDeColunas(novoNumeroDeColunas)
                }
            }
        };

        /**
         * Cria um evento para que toda vez que a tela sofrer alguma atualização de largura
         * 
         * o sistema deve atualizar a quantidade com base no novo tamanho de tela
         * 
         * Os dados só serao pedidos caso tenha aumentado a quantidade
         *  fora isso vai estar em cache até atualização da tela ou mudança de pagina.
        */
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    /* useEffect para obter os dados visiveis na tela */
    useEffect(() => {
        console.log('obter a data com base na quantidade')
    }, [paginaAtual, numeroDeColunas])

    /**
     * Atualmente o retorno esta sendo um dado de MOCK com a quantidade de itens que vai estar a mostra na tela
    */
    return (
        <>
            <s.CatalogoContainer ref={containerRef}>
                {
                    Array.from({ length: (numeroDeLinhas * numeroDeColunas) }).map((_, index) => {
                        return <ProductCard key={`catalogItem-${index}`} />
                    })
                }
            </s.CatalogoContainer>
            <PaginacaoComponente
                changeTo={() => { }}
                numeroDePaginas={paginaQuantidade}
                paginaAtual={paginaAtual}
            />
        </>
    )
};

export default CatalogoComponent;

