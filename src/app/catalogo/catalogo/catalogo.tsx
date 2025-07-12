'use client'
import * as s from './style'
import ProductCard from "@/components/product-card/component";
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
    /* Referencia o container para ajusta a quantidade com base na tela */
    const containerRef = useRef<HTMLDivElement>(null)

    /* Referencia a quantidade de colunas sem atualizar todo o conteudo */
    const [numeroDeColunas, setNumeroDeColunas] = useState(0);
    const numeroDeLinhas: number = 5;

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const actualWidth: number = containerRef.current.clientWidth;
                const minSize: number = 150;
                const gapSize: number = 16;

                const numeroDeColunas: number = Math.floor((actualWidth + gapSize) / (minSize + gapSize))

                setNumeroDeColunas(numeroDeColunas)
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <s.CatalogoContainer ref={containerRef}>
            {
                Array.from({ length: (numeroDeLinhas * numeroDeColunas) }).map((_, index) => {
                    return <ProductCard key={`catalogItem-${index}`} />
                })
            }
        </s.CatalogoContainer>
    )
};

export default CatalogoComponent;

