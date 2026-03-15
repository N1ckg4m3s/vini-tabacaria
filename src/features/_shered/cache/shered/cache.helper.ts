import { serializeFilters } from "@/features/client/catalog/services/sanitizeFilters";
import { SelectedFilters } from "@/features/client/catalog/types/HooksProps";

export const TTL = 10 * 60 * 1000
export const MAX_CACHE_KEYS = 30

// Valida se o TTL esta em tempo
export const verifyTTL = (createdAt: number): boolean => Date.now() - createdAt < TTL;

// Limpa os registros do filtro que estão vazios
export const cleanNullFilters = (filters: SelectedFilters) =>
    Object.fromEntries(
        Object.entries(filters).filter(
            ([_, list]) => list.size > 0
        )
    )

// Serializar filtro
export const SerializeFilterToCacheKey = (filters: SelectedFilters): string => {
    // Remove valores vazios/nulos
    const cleanFilter = cleanNullFilters(filters)

    const serialized = serializeFilters(cleanFilter);

    // transforma {[k:string]: string[]} em 'key:string,string'
    return Object.entries(serialized).map(([key, values]) => `${key}:${[...values].sort().join(',')}`).sort().join(';');
}