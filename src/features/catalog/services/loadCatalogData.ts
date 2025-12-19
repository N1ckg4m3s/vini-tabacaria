import { loadCatalogProps } from "../types/ServicesProps"
import { getAllCatalogItens } from "../api/getAllItens"
import { sanitizeFilters } from "./sanitizeFilters";

export const loadCatalog: loadCatalogProps = async ({ filtros, paginaAtual, limit }) => {
    const { itens, totalPages } = await getAllCatalogItens({
        filtros: sanitizeFilters(filtros),
        paginaAtual,
        limit
    })

    return { itens, totalPages };
}