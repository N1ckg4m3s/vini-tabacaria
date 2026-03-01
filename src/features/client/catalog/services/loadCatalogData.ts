import { fetchProductsPaginated } from "@/features/_shered/services/getAllItens";
import { loadCatalogProps } from "../types/ServicesProps"
import { sanitizeFilters } from "./sanitizeFilters";

export const loadCatalog: loadCatalogProps = async ({ filtros, paginaAtual, limit }) => {
    const { itens, totalPages } = await fetchProductsPaginated({
        filtros: sanitizeFilters(filtros),
        paginaAtual,
        limit
    })

    return { itens, totalPages };
}