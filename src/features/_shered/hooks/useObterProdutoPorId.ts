'use client'

import { useEffect, useState } from "react";
import { loadProductInfo } from "../api/loadProduct";
import { useNotification } from "../../../providers/notification.provider";
import { Produto } from "../../../shered/shered.types";
import { errorToNotification } from "../../system/notification/service/errorToNotification";

// ------------------------
// Use products parametros
// ------------------------
type useProduct_Params = { id?: string }
type useProduct_Respose = {
    product: Produto | undefined
    loading: boolean
}

export const useObterProdutoPorId = ({ id }: useProduct_Params): useProduct_Respose => {
    const { adicionarNotificacao } = useNotification()

    const [Product, setProducts] = useState<Produto | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        let cancelled = false

        async function fetchProduct() {
            if (!id) {
                setProducts(undefined)
                setLoading(false)
                return
            }

            setLoading(true)
            setProducts(undefined)

            try {
                const { product } = await loadProductInfo({ id })
                if (!cancelled) setProducts(product)

            } catch (e) {
                if (!cancelled) adicionarNotificacao(errorToNotification(e))

            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        fetchProduct()

        return () => { cancelled = true }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])


    return { product: Product, loading };
};
