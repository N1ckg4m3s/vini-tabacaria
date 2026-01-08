import { useEffect, useState } from "react"
import { UseDirectionsProps } from "../types/hooks.types"
import { obterProdutosInsites } from "../api/obterProdutosInsites";
import { formatDirectionsData } from "../service/formatDirectionsData";
import { TableItem } from "../types/components.types";

export const useDirections: UseDirectionsProps = () => {
    const [ViewedProducts, setViewedProducts] = useState<TableItem[]>([]);
    const [CartStats, setCartStats] = useState<TableItem[]>([]);

    useEffect(() => {
        const fetchDirectionsData = async () => {
            const data = await obterProdutosInsites();

            const viewsDataFormatted = data.ViewedProducts.map(formatDirectionsData);
            const cartDataFormatted = data.CartStats.map(formatDirectionsData);

            setCartStats(cartDataFormatted);
            setViewedProducts(viewsDataFormatted);

            console.log('Dados de Direcionamento buscados:', data);
        }
        fetchDirectionsData();
    }, [])

    return { ViewedProducts, CartStats };
}