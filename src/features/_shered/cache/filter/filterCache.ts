import { MAX_CACHE_KEYS, SerializeFilterToCacheKey, verifyTTL } from "../shered/cache.helper";
import { filterCacheEntity, filterCacheParams } from "./filter.types";

const CatalogFilterCache: Map<string, filterCacheEntity> = new Map()

const cleanOldCache = () => {
    if (CatalogFilterCache.size < MAX_CACHE_KEYS) return;

    let oldestKey: string | null = null;
    let oldestAccess = Infinity;

    for (const [key, value] of CatalogFilterCache) {
        if (value.lastAccess < oldestAccess) {
            oldestAccess = value.lastAccess;
            oldestKey = key;
        }
    }

    if (oldestKey) {
        CatalogFilterCache.delete(oldestKey);
    }
}

const getCacheByKey = (key: string): any | undefined => CatalogFilterCache.get(key);

const saveDataByKey = (key: string, data: any) => {
    cleanOldCache()
    CatalogFilterCache.set(key, {
        createdAt: Date.now(),
        lastAccess: Date.now(),
        filters: data
    })
}

export const fetchFilterCached = async (params: filterCacheParams) => {
    const { selectedFilters, callBack } = params;

    const key = SerializeFilterToCacheKey(selectedFilters)

    const loadAndCache = async () => {
        const dataFetch = await callBack();
        saveDataByKey(key, dataFetch);

        return dataFetch;
    }

    const cachedData = getCacheByKey(key);

    // // Validação 1: Se tem os dados
    if (!cachedData) return await loadAndCache();

    // // Validação 2: Data Valida
    if (!verifyTTL(cachedData.createdAt)) {
        CatalogFilterCache.delete(key)
        return await loadAndCache()
    };

    cachedData.lastAccess = Date.now();

    return cachedData.filters
}