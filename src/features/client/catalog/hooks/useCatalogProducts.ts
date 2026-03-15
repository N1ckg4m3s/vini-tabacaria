'use client'

import { useEffect, useRef, useState } from "react";
import { UseCatalogProductsProps } from "../types/HooksProps";
import { loadCatalog } from "../services/loadCatalogData";
import { Produto } from "@/shered/shered.types";
import { useNotification } from "@/providers/notification.provider";
import { errorToNotification } from "@/features/system/notification/service/errorToNotification";
import { fetchCatalogCached } from "@/features/_shered/cache/catalog/catalogCache";

export const useCatalogProducts: UseCatalogProductsProps = ({ filtros, paginaAtual, numeroPorPagina }) => {
    const { adicionarNotificacao } = useNotification()

    const [catalogProducts, setCatalogProducts] = useState<Produto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const totalPagesRef = useRef<number>(0);

    useEffect(() => {
        if (!numeroPorPagina || numeroPorPagina <= 0) return;

        if (paginaAtual <= 0) return;

        async function fetchProducts() {
            try {
                const { itens, totalPages } = await fetchCatalogCached({
                    page: paginaAtual,
                    perPage: numeroPorPagina,
                    filters: filtros || {},
                    callBack: () => loadCatalog({
                        filtros,
                        limit: numeroPorPagina,
                        paginaAtual
                    }),
                })

                totalPagesRef.current = totalPages
                setCatalogProducts(itens);
            } catch (e) {
                adicionarNotificacao(errorToNotification(e));
            } finally {
                setLoading(false)
            }
        }
        setLoading(true)
        fetchProducts();

    }, [paginaAtual, numeroPorPagina, filtros]);

    return {
        catalogProducts,
        totalPages: totalPagesRef.current,
        loading
    };
};