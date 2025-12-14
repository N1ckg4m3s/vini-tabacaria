import { apiCaller } from "@/features/_shered/services/apiCaller"

export const getFiltersInformations = async () => {
    try {
        const request = await apiCaller({
            url: '/api/filters'
        })
        
        if (!request) {
            throw new Error("Não tem resposta no request")
        }
        
        return request
    } catch (e) {
        console.error(`[Feature/Catalog/Api/getAllItens] Error: ${e}`)
        return []
    }
}