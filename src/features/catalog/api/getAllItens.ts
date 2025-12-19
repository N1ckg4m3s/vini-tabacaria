import { apiCaller } from "@/features/_shered/services/apiCaller"
import { getAllCatalogItensProps } from "../types/ApiProps"
import { NoResponseError } from "@/http/error/erros.handle"

export const getAllCatalogItens: getAllCatalogItensProps = async ({ filtros, paginaAtual, limit }) => {
    const request = await apiCaller({
        url: '/api/produto/get-all',
        params: {
            filters: JSON.stringify(filtros),
            page: paginaAtual,
            limit_per_page: limit
        }
    })

    if (!request) {
        throw new NoResponseError()
    }

    return {
        itens: request.itens,
        totalPages: Math.ceil(request.total / limit)
    }
}