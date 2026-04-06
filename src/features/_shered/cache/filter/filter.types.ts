import { SelectedFilters } from "@/features/client/catalog/types/HooksProps"
import { CatalogFilterSource } from "@/shered/shered.types"

export type filterCacheEntity = {
    lastAccess: number,
    createdAt: number,
    filters: CatalogFilterSource,
}

export interface filterCacheParams {
    selectedFilters: SelectedFilters,
    callBack: () => Promise<CatalogFilterSource>
}