import { InternalError } from "../../http/error/erros.handle";
import { CartProduto, Order } from "../../shered/shered.types";
import { formatOrderItem } from "./order.dto";
import { OrderRepo } from "./order.repo";
import { OrderStatus } from "./order.types";

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

        console.log(order)

        if (!order) throw new InternalError('Não foi possivel atualizar o status da order')

        return order
    }
}