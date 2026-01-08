import { apiCaller } from "@/features/_shered/services/apiCaller"
import { NoResponseError } from "@/http/error/erros.handle"
import { obterPulsoDeUsoProps } from "../types/api.types"

export const obterPulsoDeUso: obterPulsoDeUsoProps = async () => {
    const request = await apiCaller({
        url: '/api/admin/dashboard/pulseData',
        method: 'GET',
    })

    if (!request) {
        throw new NoResponseError()
    }

    return {
        todayAcess: request.todayAcess,
        weeklyAccesses: request.weeklyAccesses,
        topDevice: request.topDevice,
        topDevicePercentage: request.topDevicePercentage,
    }
}
