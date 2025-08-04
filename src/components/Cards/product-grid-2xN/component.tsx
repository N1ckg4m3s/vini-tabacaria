'use client';
import { useEffect, useState } from 'react';
import ProductCard from '../product-card/component';
import * as s from './style'
import { Produto } from '@/controller/types';
import { apiCaller } from '@/controller/apiCaller';

interface props {
    titulo: string;
    urlData: string;
    urlParams?: Record<string, string | number | boolean>;
}

/**
 * Container focado em obter as informações da api e mostrar em uma grade:
 * - 2 linhas
 * - N colunas
 * - Scroll horizontal
 * 
 * @param {string} Titulo - Titulo que o container vai ter
 * @param {string} urlData - Url da api que vai usar para chamar as informações
 * 
 * @returns {JSX.Element} Component - Renderiza os cards de produtos
 * @returns {JSX.Element} Loading - Renderiza um loading enquanto os dados não são obtidos
 * @returns {JSX.Element} Error - Renderiza um erro caso não consiga obter os dados
*/
const ProductGrid2xN: React.FC<props> = ({ titulo, urlData, urlParams }) => {
    /** lista que vai ser mostrada com base no tipo */
    const [list, setList] = useState<Produto[]>([])

    /** States para indicar error e loading */
    const [isLoading, setLoading] = useState<boolean>(true)
    const [hasError, setError] = useState<string>('')

    /** Obtem os dados dos cards com base na url e parametros passados */
    const handleCallApi = async () => {
        try {
            const Data = await apiCaller({
                url: urlData,
                params: urlParams
            })
            if (Data) {
                setList(Data.responseData || [])
            }

            setLoading(false)

        } catch (e) {
            setLoading(false)
            setError(`${e}`);
        }
    }

    /** Chama a api quando o componente é montado ou quando a urlData muda */
    useEffect(() => {
        setLoading(true)
        handleCallApi()
    }, [urlData])

    /** Componente de retorno caso tenha um erro */
    if (hasError !== '') return (
        <s.GridContainer>
            <s.TituloGrid>{titulo}</s.TituloGrid>
            {hasError}
        </s.GridContainer>
    )
    /** Componente de retorno caso esteja carregando */
    if (isLoading) return (
        <s.GridContainer>
            <s.TituloGrid>{titulo}</s.TituloGrid>
            loading...
        </s.GridContainer>
    )

    return (
        <s.GridContainer>
            <s.TituloGrid>{titulo}</s.TituloGrid>

            <s.ProductGridContainer>
                {
                    list.length === 0 ? (
                        <span>no data</span>
                    ) : (
                        list.map((produto, idx) => (
                            <ProductCard
                                key={idx}
                                itemData={produto}
                                small
                            />
                        ))
                    )
                }
            </s.ProductGridContainer>
        </s.GridContainer>
    );
};

export default ProductGrid2xN;
