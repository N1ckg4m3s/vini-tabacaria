import { createRoute } from "@/http/http.handler";
import { ProductInfoService } from "@/server/productInformations/product.service";
import { resolveProductId } from "@/server/products/product-id.resolver";

export const GET = createRoute(async (request) => {
    const productId = await resolveProductId(request)

    const service = new ProductInfoService()

    return await service.obterItensPorRelevancia({ productId })
})