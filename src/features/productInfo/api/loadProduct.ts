import { apiCaller } from "@/features/_shered/services/apiCaller"
import { getProduct_Props } from "../types/ApiProps"

export const loadProductInfo: getProduct_Props = async ({ id }) => {
    try {
        const request = await apiCaller({
            url: '/api/produto/get-by-id',
            params: { productId: id }
        })

        if (!request) {
            throw new Error("Não tem resposta no request")
        }

        return { product: request }
    } catch (e) {
        console.error(`[Feature/ProductInfo/Api/loadProduct] Error: ${e}`)
        return { product: undefined }
    }
}