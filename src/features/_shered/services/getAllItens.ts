import { apiCaller } from "@/features/_shered/services/apiCaller"
import { fetchProductsPaginatedProps } from "./services.types"
import { NoResponseError } from "@/http/error/erros.handle"

export const fetchProductsPaginated: fetchProductsPaginatedProps = async ({ filtros, paginaAtual, limit }) => {
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