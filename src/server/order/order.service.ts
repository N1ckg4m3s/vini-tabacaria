import { orderResume, OrderSection } from "@/features/admin/orderList/types/type";
import { InternalError } from "../../http/error/erros.handle";
import { CartProduto, Order } from "@/shered/shered.types";
import { formatOrderItem } from "./order.dto";
import { OrderRepo } from "./order.repo";
import { getOrderByTab, OrderStatus, statusMap } from "./order.types";

export class OrderService {
    private orderRepo = new OrderRepo()

    createOrderByCart = async (produtos: CartProduto[]): Promise<string> => {
        const total = produtos.reduce((prev, prod) => prev += prod.subTotal, 0)
        const orderId = await this.orderRepo.createOrder({ total });

        if (!orderId) throw new InternalError('O order não conseguiu ser criado');

        try {
            const formatedData = produtos.map(p => formatOrderItem(p, orderId))
            await this.orderRepo.insertOrderItems(formatedData)
        } catch {
            // em caso de erro abortar
            await this.orderRepo.deleteOrderItens(orderId)
            await this.orderRepo.deleteOrder(orderId)

            throw new InternalError("Não foi possivel salvar o carrinho, tente novamente mais tarde")
        }

        return orderId;
    }

    getOrderById = async (orderId: string): Promise<Order> => {
        const order = await this.orderRepo.getOrderById(orderId);

        if (!order) throw new InternalError('Não foi possivel obter a order')

        return order
    }

    updateStatus = async (orderId: string, newStatus: OrderStatus) => {
        const order = await this.orderRepo.updateOrderStatus(orderId, newStatus);

        if (!order) throw new InternalError('Não foi possivel atualizar o status da order')

        return order
    }

    getAllOrdersByTab = async (params: getOrderByTab) => {
        const { page = 1, tab, limit = 20 } = params

        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const statusList: OrderStatus[] = tab == 'processing' ?
            [OrderStatus.HANDLING, OrderStatus.PENDING] :
            [OrderStatus.COMPLETED, OrderStatus.CANCELED];

        const { data, count } = await this.orderRepo.getOrderByTab({ statusList, from, to })

        // Format resposta
        const orders: orderResume[] = data.map(order => ({
            id: order.id,
            created_at: new Date(order.created_at),
            status: order.status,
            total: order.total,
            order_products_count: order.order_items?.reduce((sum, item) => sum + (item.quantity ?? 0), 0)
        }));

        const sectionsMap = orders.reduce((acc, order) => {
            if (!acc[order.status]) {
                acc[order.status] = {
                    sectionTitle: statusMap[order.status],
                    orderList: []
                };
            }

            acc[order.status].orderList.push(order);

            return acc;
        }, {} as Record<string, OrderSection>);

        return {
            data: Object.values(sectionsMap),
            pagination: {
                page,
                limit,
                total: count,
                totalPages: Math.ceil((count ?? 0) / limit)
            }
        };
    }
}