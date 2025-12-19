import { apiCaller } from "@/features/_shered/services/apiCaller"
import { getRelactive_Props } from "../types/ApiProps"
import { NoResponseError } from "@/http/error/erros.handle"

export const loadRelactiveProducts: getRelactive_Props = async ({ id, relacao }) => {
    const request = await apiCaller({
        url: '/api/produto/get-by-relation',
        params: {
            productId: id,
            relacao
        }
    })

    if (!request) {
        throw new NoResponseError()
    }

    return { products: request }
}