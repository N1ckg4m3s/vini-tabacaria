import { catalogCacheEntity, catalogCacheParams } from "./cache.types";
import { loadCatalogRespose } from "@/features/client/catalog/types/ServicesProps";
import { MAX_CACHE_KEYS, SerializeFilterToCacheKey, verifyTTL } from "../shered/cache.helper";

const CatalogProductsCache: Map<string, catalogCacheEntity> = new Map()

const cleanOldCache = () => {
    if (CatalogProductsCache.size < MAX_CACHE_KEYS) return;

    let oldestKey: string | null = null;
    let oldestAccess = Infinity;

    for (const [key, value] of CatalogProductsCache) {
        if (value.lastAccess < oldestAccess) {
            oldestAccess = value.lastAccess;
            oldestKey = key;
        }
    }

    if (oldestKey) {
        CatalogProductsCache.delete(oldestKey);
    }
}

const getCacheByKey = (key: string): catalogCacheEntity | undefined => {
    return CatalogProductsCache.get(key);
}

const saveDataByKey = (key: string, data: loadCatalogRespose) => {
    cleanOldCache()
    CatalogProductsCache.set(key, {
        createdAt: Date.now(),
        lastAccess: Date.now(),
        products: data
    })
}

export const generateCacheKey = (page: number, perPage: number, filtersSerialized: string) => {
    return `page:${page}|perPage:${perPage}|filter=${filtersSerialized}`
}

export const fetchCatalogCached = async (params: catalogCacheParams) => {
    const { page, perPage, filters, callBack } = params;

    const filterSerialized = SerializeFilterToCacheKey(filters)
    const key = generateCacheKey(page, perPage, filterSerialized)

    const loadAndCache = async () => {
        const dataFetch = await callBack();
        saveDataByKey(key, dataFetch);

        return dataFetch;
    }

    const cachedData = getCacheByKey(key);

    // Validação 1: Se tem os dados
    if (!cachedData) return await loadAndCache();

    // Validação 2: Data Valida
    if (!verifyTTL(cachedData.createdAt)) {
        CatalogProductsCache.delete(key)
        return await loadAndCache()
    };

    cachedData.lastAccess = Date.now();

    return cachedData.products
}