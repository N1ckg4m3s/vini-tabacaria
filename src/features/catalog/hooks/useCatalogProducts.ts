'use client'

import { useEffect, useRef, useState } from "react";
import { UseCatalogProductsProps } from "../types/HooksProps";
import { loadCatalog } from "../services/loadCatalogData";
import { Produto } from "@/shered/shered.types";

export const useCatalogProducts: UseCatalogProductsProps = ({ filtros, paginaAtual, numeroPorPagina }) => {
    const [catalogProducts, setCatalogProducts] = useState<Produto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const totalPagesRef = useRef<number>(0);

    useEffect(() => {
        if (!numeroPorPagina || numeroPorPagina <= 0) return;

        if (paginaAtual <= 0) return;

        async function fetchProducts() {
            const { itens, totalPages } = await loadCatalog({
                filtros,
                limit: numeroPorPagina,
                paginaAtual
            });

            totalPagesRef.current = totalPages

            setCatalogProducts(itens);
            setLoading(false)
        }
        setLoading(true)
        fetchProducts();

    }, [paginaAtual, numeroPorPagina]);

    return {
        catalogProducts,
        totalPages: totalPagesRef.current,
        loading
    };
};
