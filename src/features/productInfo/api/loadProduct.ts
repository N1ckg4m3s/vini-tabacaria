import { apiCaller } from "@/features/_shered/services/apiCaller"
import { getProduct_Props } from "../types/ApiProps"
import { NoResponseError } from "@/http/error/erros.handle"

export const loadProductInfo: getProduct_Props = async ({ id }) => {
    const request = await apiCaller({
        url: '/api/produto/get-by-id',
        params: { productId: id }
    })

    if (!request) {
        throw new NoResponseError()
    }

    return { product: request }
}