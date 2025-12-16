import { apiCaller } from "@/features/_shered/services/apiCaller"
import { getRelactive_Props } from "../types/ApiProps"

export const loadRelactiveProducts: getRelactive_Props = async ({ id, relacao }) => {
    try {
        const request = await apiCaller({
            url: '/api/produto/get-by-relation',
            params: {
                productId: id,
                relacao
            }
        })

        if (!request) {
            throw new Error("Não tem resposta no request")
        }

        return { products: request }
    } catch (e) {
        console.error(`[Feature/ProductInfo/Api/loadRelactive] Error: ${e}`)
        return { products: [] }
    }
}