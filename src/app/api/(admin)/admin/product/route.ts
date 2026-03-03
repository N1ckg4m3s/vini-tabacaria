import { BadRequestError } from "@/http/error/erros.handle";
import { createRoute } from "@/http/http.handler";
import { productDTOWithoutID } from "@/server/products/product.DTO";
import { ProductService } from "@/server/products/product.service";

export const POST = createRoute(async (req) => {
    const body = await req.json()
    const product = productDTOWithoutID(body)

    const service = new ProductService()
    const serviceResponse = await service.createProduct(product)

    return serviceResponse
})

export const PUT = createRoute(async (req) => {
    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id");

    if (!id) throw new BadRequestError("Identificador não informado")

    const body = await req.json()
    const product = productDTOWithoutID(body)

    const service = new ProductService()
    const serviceResponse = await service.updateProduct(id, product)

    return serviceResponse
})

export const DELETE = createRoute(async (req) => {
    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id");

    if (!id) throw new BadRequestError("Identificador não informado")

    const service = new ProductService()
    const serviceResponse = await service.deleteProduct(id)

    return serviceResponse
})