import { OrderStatus } from "../../../../server/order/order.types";

type statusMap = Record<OrderStatus, boolean>

const rules: Record<OrderStatus, statusMap> = {
    [OrderStatus.PENDING]: {
        pending: true,
        handling: false,
        completed: true,
        canceled: false
    },
    [OrderStatus.HANDLING]: {
        pending: true,
        handling: true,
        completed: false,
        canceled: false
    },
    [OrderStatus.COMPLETED]: {
        pending: true,
        handling: true,
        completed: true,
        canceled: true
    },
    [OrderStatus.CANCELED]: {
        pending: true,
        handling: true,
        completed: false,
        canceled: true
    }
}

export const disableStatus = (status: OrderStatus) => rules[status]