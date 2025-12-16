'use client'

import { useEffect, useState } from "react";
import { Produto } from "@/shered/shered.types";
import { useRelactive_Props } from "../types/HooksProps";
import { loadRelactiveProducts } from "../api/loadRelactive";

export const useRelactivesProduct: useRelactive_Props = ({ id, relacao }) => {
    const [Product, setProducts] = useState<Produto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return;

        async function fetchProducts() {
            const { products } = await loadRelactiveProducts({ id, relacao });

            if (!products) return

            setProducts(products);

            setLoading(false)
        }
        setLoading(true)
        fetchProducts();

    }, [id]);

    return {
        products: Product,
        loading
    };
};
