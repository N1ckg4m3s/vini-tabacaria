import { NoResponseError } from "@/http/error/erros.handle";
import { OrderStatus } from "@/server/order/order.types";
import { apiCaller } from "@/features/_shered/services/apiCaller";

export const changeStatus = async (newStatus: OrderStatus, orderId: string) => {
    const response = await apiCaller({
        url: '/api/order',
        method: 'PUT',
        params: { orderId },
        body: { newStatus }
    })

    if (!response) throw new NoResponseError();

    return response
}