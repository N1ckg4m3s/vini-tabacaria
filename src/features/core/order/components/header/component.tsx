'use client'

import { OrderStatus, statusMap } from "../../../../../server/order/order.types"
import * as s from './style'

interface props {
    orderId: string
    status: OrderStatus
}

export const OrderHeader: React.FC<props> = ({ orderId, status }) => {
    return (
        <s.orderHeader>
            <s.orderId>
                Pedido ${orderId.slice(0, 10)}
            </s.orderId>
            <s.orderStatus status={status} >
                {statusMap[status]}
            </s.orderStatus>
        </s.orderHeader>
    )
}