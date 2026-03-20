import { BadRequestError } from "../../../../http/error/erros.handle";
import { createRoute } from "../../../../http/http.handler";
import { OrderService } from "../../../../server/order/order.service";
import { CartProduto } from "../../../../shered/shered.types";

export const POST = createRoute(async (request) => {
    const body = await request.json()
    const { produtos }: { produtos: CartProduto[] } = body;

    if (!produtos || produtos.length < 0) throw new BadRequestError('Não foi possivel encontrar os produtos');

    const service = new OrderService()

    const OrderId: string = await service.createOrderByCart(produtos)

    return OrderId;
})
