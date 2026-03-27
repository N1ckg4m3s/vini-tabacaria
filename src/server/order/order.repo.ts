import { SupabaseClient } from "@supabase/supabase-js";
import suprabase from "../connections/supraBaseConnection";
import { CreateOrderType, DataBaseFormat, getOrderByTabRepo, OrderStatus } from "./order.types";
import { BadRequestError, InternalError } from "../../http/error/erros.handle";
import { Order } from "../../shered/shered.types";
import { orderResume } from "../../features/admin/orderList/types/type";

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

    async getOrderByTab(params: getOrderByTabRepo): Promise<any> {
        const { from, statusList, to } = params

        const { data, error, count } = await this.supra
            .from('orders')
            .select(`
                id,
                total,
                status,
                created_at,
                order_items(quantity)
            `, { count: 'exact' })
            .in('status', statusList)
            .order('created_at', { ascending: false })
            .range(from, to);

        if (error) throw new BadRequestError(error.message, error.cause);

        return { data, count }
    }

    async getOrderById(orderId: string): Promise<Order> {
        const { data, error } = await this.supra.from('orders')
            .select(`
                id,
                total,
                status,
                order_items(
                    quantity,
                    unit_price,
                    product:products (
                        nome,
                        marca,
                        tipo,
                        imagem
                    )
                )
            `)
            .eq('id', orderId)
            .single<Order>()

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

    async updateOrderStatus(orderId: string, newStatus: OrderStatus) {
        const { data, error } = await this.supra
            .from('orders')
            .update({ status: newStatus })
            .eq('id', orderId)
            .select()
            .single();

        if (error) throw new BadRequestError(error.message, error.cause);

        return data
    }
}