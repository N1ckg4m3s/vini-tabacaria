import { apiCaller } from "@/features/_shered/services/apiCaller"
import { getAllCatalogItensProps } from "../types/ApiProps"

export const getAllCatalogItens: getAllCatalogItensProps = async ({ filtros, paginaAtual, limit }) => {
    try {
        const request = await apiCaller({
            url: '/api/produto/get-all',
            params: {
                filters: JSON.stringify(filtros),
                page: paginaAtual,
                limit_per_page: limit
            }
        })

        if (!request) {
            throw new Error("Não tem resposta no request")
        }

        return {
            itens: request.itens || [],
            totalPages: request.totalPages || 0
        }
    } catch (e) {
        console.error(`[Feature/Catalog/Api/getAllItens] Error: ${e}`)
        return { itens: [], totalPages: 0 }
    }
}