'use client'

import { ProductIntention, ProductIntentionStorageFormat } from "../types/services.types";
import { AnalyticsEvent } from "../types/analytics.events";
import { formatDateBR } from "../../../_shered/services/formaters/data.formatter";
import { apiCaller } from "../../../_shered/services/apiCaller";

const storageKey = 'analytics_product_intention';
const limitAntSpan = 5;

export const notifyProductIntention = (productId: string, intention: 'add' | 'remove') => {
    if (typeof window === 'undefined') return;

    const hoje: string = formatDateBR(new Date());
    let analytcsSaved: ProductIntentionStorageFormat = { date: hoje, products: [] }

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

            const safeProducts: ProductIntention[] =
                parsedStorageValue.products.filter(
                    (p: ProductIntention) =>
                        p &&
                        typeof p.productId === 'string' &&
                        typeof p.atempts?.add === 'number' &&
                        typeof p.atempts?.remove === 'number'
                );

            analytcsSaved = {
                date: parsedStorageValue.date,
                products: safeProducts
            };
        }
    } catch { }

    if (analytcsSaved.date !== hoje) {
        analytcsSaved = { date: hoje, products: [] }
    }

    let productEntry = analytcsSaved.products.find(p => p.productId === productId);

    if (!productEntry) {
        productEntry = {
            productId: productId,
            atempts: { add: 0, remove: 0 }
        };
        analytcsSaved.products.push(productEntry);
    }

    if (productEntry.atempts[intention] >= limitAntSpan) return;
    productEntry.atempts[intention] += 1;

    localStorage.setItem(storageKey, JSON.stringify(analytcsSaved));

    apiCaller({
        method: 'POST',
        url: '/api/analytcs/events',
        body: {
            event: intention === 'add' ? AnalyticsEvent.ProductAddedToCart : AnalyticsEvent.ProductRemovedFromCart,
            productId,
        }
    })
}