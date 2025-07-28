'use client'
import PaginacaoComponente from '@/components/CatalogComponents/paginacao-component/component';
import * as s from './style'
import ProductCard from "@/components/Cards/product-card/component";
import { useEffect, useRef, useState } from "react";
import { apiCaller } from '@/controller/apiCaller';
import { Produto } from '@/controller/types';

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
    /* Lista de itens locais */
    const [catalogProducts, setCatalogProducts] = useState<Produto[]>([])

    /* Referencia o container para ajusta a quantidade com base na tela */
    const containerRef = useRef<HTMLDivElement>(null)

    /* Referencia a quantidade de colunas sem atualizar todo o conteudo */
    const [numeroDeColunas, setNumeroDeColunas] = useState(0);

    /* Paginação */
    const [paginaAtual, setPaginaAtual] = useState<number>(0);
    const [paginaQuantidade, setPaginaQuantidade] = useState<number>(0);

    const numeroDeLinhas: number = 5;

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
     * Obtem os dados da API com base na pagina
     * limitando ao numero de itens possiveis na pagina
     * 
    */
    const handleGetCatalogData = async () => {
        try {
            /**
             * Obtem os dados com base na pagina e na quantidade por pagina
             * 
             * @return {
             *  currentPage: number -- pagina atual
             *  items: Produto[] -- lista com os produtos da pagina
             *  limitPerPage: number -- quantidade de itens por pagina
             *  totalItems: number -- quantidade total de itens
             *  totalPages: number -- numero maximo de paginas
             * }
            */
            const Request = await apiCaller({
                url: '/api/produto/get-all',
                params: {
                    page: paginaAtual,
                    limit_per_page: numeroDeLinhas * numeroDeColunas
                }
            })

            setPaginaQuantidade(Request.totalPages)
            setCatalogProducts(Request.items)
        } catch (e) {
            console.log('Catch {handleGetCatalogData} |', e)
        }
    }

    const handleChangePageTo = (page: number) => {
        setPaginaAtual(page)
    }

    /* useEffect para o rezise */
    useEffect(() => {
        /**
         * Chama apenas caso o numero de colunas for maior que 0
         * 
         * o Valor por ser 0 na inicialização.
        */
        if (numeroDeColunas != 0) {
            handleGetCatalogData()
        }

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
    }, [paginaAtual, numeroDeColunas]);

    /**
     * Atualmente o retorno esta sendo um dado de MOCK com a quantidade de itens que vai estar a mostra na tela
    */
    return (
        <s.CatalogoContainer>
            <s.ItensContainer ref={containerRef}>
                {
                    catalogProducts.map((catalogItem, index) => (
                        <ProductCard
                            key={`catalogItem-${index}`}
                            noCarrinho={false}
                            itemData={catalogItem as Produto}
                        />
                    ))
                }
            </s.ItensContainer>
            <PaginacaoComponente
                changeTo={handleChangePageTo}
                numeroDePaginas={paginaQuantidade}
                paginaAtual={paginaAtual}
            />
        </s.CatalogoContainer>
    )
};

export default CatalogoComponent;