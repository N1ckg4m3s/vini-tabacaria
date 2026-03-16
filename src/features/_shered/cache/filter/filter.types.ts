import { CatalogFilterSource } from "../../../../shered/shered.types"
import { SelectedFilters } from "../../../client/catalog/types/HooksProps"

export type filterCacheEntity = {
    lastAccess: number,
    createdAt: number,
    filters: CatalogFilterSource,
}

export interface filterCacheParams {
    selectedFilters: SelectedFilters,
    callBack: () => Promise<CatalogFilterSource>
}