'use client'

import { formatDateBR } from "@/features/_shered/services/formaters/data.formatter";
import { ProductViewedStorageFormat } from "../types/services.types";
import { AnalyticsEvent } from "../types/analytics.events";
import { apiCaller } from "@/features/_shered/services/apiCaller";

const storageKey = 'analytics_product_viewed';

export const notifyProductViewed = (productId: string) => {
    if (typeof window === 'undefined') return;

    const hoje: string = formatDateBR(new Date());
    let analytcsSaved: ProductViewedStorageFormat = { date: hoje, products: [] }

    try {
        const storageValue = localStorage.getItem(storageKey);
        if (storageValue) {
            const parsedStorageValue = JSON.parse(storageValue);

            if (
                typeof parsedStorageValue !== 'object' ||
                parsedStorageValue === null ||
                typeof parsedStorageValue.date !== 'string' ||
                !Array.isArray(parsedStorageValue.products)
            ) return;

            const safeProducts = parsedStorageValue.products.filter((p: any) => typeof p === 'string');

            analytcsSaved = {
                date: parsedStorageValue.date,
                products: safeProducts
            };
        }
    } catch { }

    if (analytcsSaved.date !== hoje) {
        analytcsSaved = { date: hoje, products: [] }
    }

    if (analytcsSaved.products.includes(productId)) return;

    analytcsSaved.products.push(productId);
    localStorage.setItem(storageKey, JSON.stringify(analytcsSaved));

    apiCaller({
        method: 'POST',
        url: '/api/analytcs/events',
        body: {
            event: AnalyticsEvent.ProductViewed,
            productId
        }
    })
}