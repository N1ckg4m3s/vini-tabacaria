import { CatalogFilters } from "@/shered/shered.types"
import { MetaKeys } from "../types/types"

export const sanitizeFilters = (filters: CatalogFilters) => {
    const sanitized: CatalogFilters = { ...filters }

    if (sanitized.marca?.length === 0) delete sanitized.marca
    if (sanitized.tipo?.length === 0) delete sanitized.tipo

    if (sanitized.meta) {
        Object.keys(sanitized.meta).forEach(key => {
            const k = key as MetaKeys
            if ((sanitized.meta![k]?.length ?? 0) === 0) delete sanitized.meta![k]
        })
    }

    return sanitized
}
