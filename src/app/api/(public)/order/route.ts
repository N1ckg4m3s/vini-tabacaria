import { BadRequestError } from "../../../../http/error/erros.handle";
import { createRoute } from "../../../../http/http.handler";
import { OrderService } from "../../../../server/order/order.service";
import { OrderStatus } from "../../../../server/order/order.types";
import { CartProduto } from "../../../../shered/shered.types";

export const POST = createRoute(async (request) => {
    const body = await request.json()
    const { produtos }: { produtos: CartProduto[] } = body;

    if (!produtos || produtos.length < 0) throw new BadRequestError('Não foi possivel encontrar os produtos');

    const service = new OrderService()

    const OrderId: string = await service.createOrderByCart(produtos)

    return OrderId;
})

export const PUT = createRoute(async (request) => {
    // Verificação do id
    const { searchParams } = request.nextUrl;
    const orderId = searchParams.get('orderId')

    if (!orderId) throw new BadRequestError('Order Id não informado');

    // Verificação do newStatus
    const body = await request.json()
    const { newStatus }: { newStatus: OrderStatus } = body;

    if (!newStatus) throw new BadRequestError('Novo status não informado');

    const service = new OrderService()

    return await service.updateStatus(orderId, newStatus)
})
