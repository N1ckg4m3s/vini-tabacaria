import { SelectedFilters } from "@/features/client/catalog/types/HooksProps";
import { loadCatalogRespose } from "@/features/client/catalog/types/ServicesProps";

export type catalogCacheEntity = {
    lastAccess: number,
    createdAt: number,
    products: loadCatalogRespose,
}

export interface catalogCacheParams {
    page: number,
    perPage: number,
    filters: SelectedFilters,
    callBack: () => Promise<loadCatalogRespose>
}