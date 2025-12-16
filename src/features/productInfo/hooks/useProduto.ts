'use client'

import { useEffect, useState } from "react";
import { Produto } from "@/shered/shered.types";
import { loadProductInfo } from "../api/loadProduct";
import { useProduct_Props } from "../types/HooksProps";

export const useProduct: useProduct_Props = ({ id }) => {
    const [Product, setProducts] = useState<Produto | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return;

        async function fetchProducts() {
            const { product } = await loadProductInfo({ id });

            if (!product) return

            setProducts(product);

            setLoading(false)
        }
        setLoading(true)
        fetchProducts();

    }, [id]);

    return { product: Product, loading };
};
