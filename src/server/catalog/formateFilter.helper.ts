import { CatalogFilters, CatalogFilterSourceSanitized } from "@/shered/shered.types";

export const formateFilter = (filters: CatalogFilterSourceSanitized): CatalogFilters => {
    const { tipo, marca, ...meta } = filters

    return { tipo, marca, meta };
}

export const serializeFilter = (filters: CatalogFilterSourceSanitized): CatalogFilterSourceSanitized => {
    return Object.fromEntries(
        Object.entries(filters).filter(([_, list]) => list.length > 0)
    )
}