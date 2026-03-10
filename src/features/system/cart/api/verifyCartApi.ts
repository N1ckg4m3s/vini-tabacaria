import { apiCaller } from "@/features/_shered/services/apiCaller"
import { verifyIdsProps } from "../types/api.type"
import { NoResponseError } from "@/http/error/erros.handle"

export const verifyCartApi: verifyIdsProps = async ({ products }) => {
    const response = await apiCaller({
        method: 'POST',
        url: '/api/cart/verify',
        body: { products }
    })

    if (!response) { throw new NoResponseError() }

    return response
}