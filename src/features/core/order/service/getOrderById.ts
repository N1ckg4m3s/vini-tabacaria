'use server'

import { OrderService } from "@/server/order/order.service"
import { Order } from "@/shered/shered.types"

export const getOrderById = async (orderId: string): Promise<Order> => {
    const service = new OrderService()

    const order: Order = await service.getOrderById(orderId)

    return order
}