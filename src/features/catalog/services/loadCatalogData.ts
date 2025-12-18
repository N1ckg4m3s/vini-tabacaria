import { loadCatalogProps } from "../types/ServicesProps"
import { getAllCatalogItens } from "../api/getAllItens"
import { sanitizeFilters } from "./sanitizeFilters";

export const loadCatalog: loadCatalogProps = async ({ filtros, paginaAtual, limit }) => {
    try {
        const { itens, totalPages } = await getAllCatalogItens({
            filtros: sanitizeFilters(filtros),
            paginaAtual,
            limit
        })

        return {
            itens,
            totalPages
        };
    } catch (e) {
        console.error(`[Feature/Catalog/Services/loadCatalog] Error: ${e}`)
        return { itens: [], totalPages: 0 }
    }
}