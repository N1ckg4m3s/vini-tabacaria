import { fetchProductsPaginated } from "@/features/_shered/services/getAllItens";
import { loadCatalogProps } from "../types/ServicesProps"
import { serializeFilters } from "./sanitizeFilters";

export const loadCatalog: loadCatalogProps = async ({ filtros, paginaAtual, limit }) => {
    const { itens, totalPages } = await fetchProductsPaginated({
        filtros: serializeFilters(filtros || {}),
        paginaAtual,
        limit
    })

    return { itens, totalPages };
}