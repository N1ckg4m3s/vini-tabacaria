'use client'

import { useEffect, useState } from "react";
import { useRelactive_Props } from "../types/HooksProps";
import { loadRelactiveProducts } from "../api/loadRelactive";
import { Produto } from "../../../../shered/shered.types";
import { useNotification } from "../../../../providers/notification.provider";
import { errorToNotification } from "../../../system/notification/service/errorToNotification";

export const useRelactivesProduct: useRelactive_Props = ({ id, relacao }) => {
    const { adicionarNotificacao } = useNotification()

    const [Product, setProducts] = useState<Produto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return;

        async function fetchProducts() {
            try {
                const { products } = await loadRelactiveProducts({ id, relacao });
                if (!products) return
                setProducts(products);
            } catch (e) {
                adicionarNotificacao(errorToNotification(e))
            } finally {
                setLoading(false)
            }
        }
        setLoading(true)
        fetchProducts();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return {
        products: Product,
        loading
    };
};
