import { loadCatalogProps } from "../types/ServicesProps"
import { getAllCatalogItens } from "../api/getAllItens"

export const loadCatalog: loadCatalogProps = async ({ filtros, paginaAtual, limit }) => {
    try {
        // Obter todos os itens por filtro
        const { itens, totalPages } = await getAllCatalogItens({ filtros, paginaAtual, limit })

        // Mapear dados
        return {
            itens: itens.map((e) => e),
            totalPages
        };
    } catch (e) {
        console.error(`[Feature/Catalog/Services/loadCatalog] Error: ${e}`)
        return { itens: [], totalPages: 0 }
    }
}