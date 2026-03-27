import { Order } from "../../../../shered/shered.types";

export type orderResume = Pick<Order, 'id' | 'status' | 'total'> & {
    order_products_count: number,
    created_at: Date
}

export interface OrderSection {
    sectionTitle: string,
    orderList: orderResume[]
}