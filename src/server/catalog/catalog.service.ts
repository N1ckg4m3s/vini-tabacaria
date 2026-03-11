import { extractUniqueStrings, rankProducts } from "./catalog.helpers";
import { CatalogFilters, Produto } from "@/shered/shered.types";
import { ProductRepository } from "../products/products.repository";

export class catalogService {
    private repo = new ProductRepository();

    async obterItensPorPagina(params: { page: number; perPage: number; filters: any; search?: string }) {
        const { page, perPage, filters, search } = params;

        const { data, count } = await this.repo.findCatalog(filters, search, page, perPage);

        return {
            itens: data,
            total: count,
            page,
            perPage
        };
    }
}