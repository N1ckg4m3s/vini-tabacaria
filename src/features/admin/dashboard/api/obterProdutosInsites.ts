import { NoResponseError } from "../../../../http/error/erros.handle"
import { apiCaller } from "../../../_shered/services/apiCaller"
import { obterProdutosInsitesProps } from "../types/api.types"

export const obterProdutosInsites: obterProdutosInsitesProps = async () => {
    const request = await apiCaller({
        url: '/api/admin/dashboard/productInsites',
        method: 'GET',
    })

    if (!request) {
        throw new NoResponseError()
    }

    return {
        ViewedProducts: request.ViewedProducts || [],
        CartStats: request.CartStats || [],
    }
}
