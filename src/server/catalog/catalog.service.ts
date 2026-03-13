import { CatalogFilters, CatalogFilterSourceSanitized } from "@/shered/shered.types";
import { ProductRepository } from "../products/products.repository";
import { formateFilter, serializeFilter } from "./formateFilter.helper";

export class catalogService {
    private repo = new ProductRepository();

    async obterItensPorPagina(params: { page: number; perPage: number; filters: CatalogFilterSourceSanitized; search?: string }) {
        const { page, perPage, filters, search } = params;

        const serializedFilter: CatalogFilterSourceSanitized = serializeFilter(filters)
        const filterFormated: CatalogFilters = formateFilter(serializedFilter);

        const { data, count } = await this.repo.findCatalog(filterFormated, search, page, perPage);

        return {
            itens: data,
            total: count,
            page,
            perPage
        };
    }
}