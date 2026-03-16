import { BadRequestError } from "@/http/error/erros.handle";
import { createRoute } from "@/http/http.handler";
import { ImageService } from "@/server/productImage/image.service";
import { productDTOWithoutID } from "@/server/products/product.DTO";
import { ProductService } from "@/server/products/product.service";

export const POST = createRoute(async (req) => {
    console.log('cheguei na rota')
    const formData = await req.formData()

    const product = productDTOWithoutID(formData)

    const service = new ProductService()
    const serviceResponse = await service.createProduct(product)

    if (!serviceResponse.id) throw new BadRequestError("Erro ao criar produto")

    // Caso seja 'File' adiciona a imagem ao produto criado
    if (product.imagem instanceof File) {
        const imageService = new ImageService()
        const publicUrl = await imageService.addImageToProduct(product.imagem, serviceResponse.id)

        // Atualiza o produto com a url da imagem
        const updatedProduct = { ...serviceResponse, imagem: publicUrl }
        return updatedProduct
    }

    return serviceResponse
})

export const PUT = createRoute(async (req) => {
    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id");

    if (!id) throw new BadRequestError("Identificador não informado")

    const formData = await req.formData()
    const product = productDTOWithoutID(formData)

    // Caso seja 'File' ele troca com a existente
    if (product.imagem instanceof File) {
        const imageService = new ImageService()
        const publicUrl = await imageService.addImageToProduct(product.imagem, id)
        product.imagem = publicUrl
    }

    console.log('atualizando')
    const service = new ProductService()
    const serviceResponse = await service.updateProduct(id, product)
    console.log('atualizado')

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