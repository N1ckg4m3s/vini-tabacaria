export enum OrderStatus {
    PENDING = 'pending',
    HANDLING = 'handling',
    COMPLETED = 'completed',
    CANCELED = 'canceled',
}

export const statusMap: Record<OrderStatus, string> = {
    canceled: 'Cancelado',
    completed: 'Entregue',
    handling: 'Em finalização',
    pending: 'Em analise'
}

export type CreateOrderType = { total: number }

export type DataBaseFormat = {
    order_id: string
    product_id: string,
    quantity: number,
    unit_price: number
}