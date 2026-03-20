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

export const GET = createRoute(async (request) => {
    const { searchParams } = request.nextUrl;
    const orderId = searchParams.get('orderId')

    if (!orderId) throw new BadRequestError('Order Id não informado')

    const service = new OrderService()

    const order = service.getOrderById(orderId)

    console.log(`obter order por Id: ${orderId}`)
})

export const PUT = createRoute(async (request) => {
    const { searchParams } = request.nextUrl;
    const orderId = searchParams.get('orderId')

    if (!orderId) throw new BadRequestError('Order Id não informado')

    const service = new OrderService()

    console.log(`atualizar order por Id: ${orderId}`)
})
