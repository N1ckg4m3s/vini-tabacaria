'use client'

import { useEffect, useState } from "react";
import { Produto } from "@/shered/shered.types";
import { loadProductInfo } from "../api/loadProduct";
import { useNotification } from "@/providers/notification.provider";
import { errorToNotification } from "@/features/system/notification/service/errorToNotification";

// ------------------------
// Use products parametros
// ------------------------
type useProduct_Params = { id: string }
type useProduct_Respose = {
    product: Produto | undefined
    loading: boolean
}

export const useObterProdutoPorId = ({ id }: useProduct_Params): useProduct_Respose => {
    const { adicionarNotificacao } = useNotification()

    const [Product, setProducts] = useState<Produto | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return;

        async function fetchProducts() {
            try {
                const { product } = await loadProductInfo({ id });
                if (!product) return
                setProducts(product);
            } catch (e) {
                adicionarNotificacao(errorToNotification(e))
            } finally {
                setLoading(false)
            }

        }
        setLoading(true)
        fetchProducts();

    }, [id]);

    return { product: Product, loading };
};
