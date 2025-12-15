import { apiCaller } from "@/features/_shered/services/apiCaller"
import { getFiltersInformationsProps } from "../types/ApiProps"

export const getFiltersInformations: getFiltersInformationsProps = async ({ filtros }) => {
    try {
        const request = await apiCaller({
            url: '/api/filters',
            params: {
                filters: JSON.stringify(filtros),
            }
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