import { BadRequestError } from "@/http/error/erros.handle";
import { createRoute } from "@/http/http.handler"
import { ProductInfoService } from "@/server/productInformations/product.service"
import { resolveProductId } from "@/server/products/product-id.resolver"

export const GET = createRoute(async (request) => {
    const { searchParams } = request.nextUrl;

    const productId = await resolveProductId(request)

    const relacao = searchParams.get("relacao");
    if (!relacao) throw new BadRequestError("Relação entre produtos não mencionada");

    const service = new ProductInfoService()

    if(relacao=='marca'){
        return await service.obterItensPorMarca({productId})
    }else if(relacao=='relevancia'){
        return await service.obterItensPorRelevancia({productId})
    }else{
        throw new BadRequestError("Relação não reconhecida")
    }
})