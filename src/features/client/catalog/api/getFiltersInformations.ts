import { apiCaller } from "@/features/_shered/services/apiCaller"
import { getFiltersInformationsProps } from "../types/ApiProps"
import { NoResponseError } from "@/http/error/erros.handle"

export const getFiltersInformations: getFiltersInformationsProps = async ({ filtros }) => {
    const request = await apiCaller({
        url: '/api/filters',
        method: 'POST',
        body: {
            filters: JSON.stringify(filtros),
        }
    })

    if (!request) throw new NoResponseError()

    return request
}