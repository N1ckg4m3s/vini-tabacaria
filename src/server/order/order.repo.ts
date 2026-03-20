import { SupabaseClient } from "@supabase/supabase-js";
import suprabase from "../connections/supraBaseConnection";
import { CreateOrderType, DataBaseFormat, OrderStatus } from "./order.types";
import { BadRequestError, InternalError } from "../../http/error/erros.handle";

export class OrderRepo {
    private supra: SupabaseClient<any, "public", any>;
    constructor() { this.supra = suprabase }

    async createOrder({ total }: CreateOrderType): Promise<string> {
        const { data, error } = await this.supra.from('orders')
            .insert({
                total,
                status: OrderStatus.PENDING
            })
            .select()
            .single()

        if (error) throw new BadRequestError(error.message, error.cause);

        return data.id
    }

    async insertOrderItems(products: DataBaseFormat[]) {
        const { data, error } = await this.supra.from('order_items')
            .insert(products)
            .select()

        if (error) throw new BadRequestError(error.message, error.cause);
        if (data.length < products.length) throw new InternalError() // Algum deu merda..

        return data
    }

    async getOrderById(orderId: string) {
        const { data, error } = await this.supra.from('orders')
            .select(`*`)
            .eq('id', orderId)
            .single()

        if (error) throw new BadRequestError(error.message, error.cause);

        return data
    }

    async deleteOrder(orderId: string) {
        const { error } = await this.supra.from('orders')
            .delete()
            .eq('id', orderId);
        if (error) throw new BadRequestError(error.message, error.cause);
    }

    async deleteOrderItens(orderId: string) {
        const { error } = await this.supra.from('order_items')
            .delete()
            .eq('order_id', orderId);
        if (error) throw new BadRequestError(error.message, error.cause);
    }
}