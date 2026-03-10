import { BadRequestError } from "@/http/error/erros.handle";
import { createRoute } from "@/http/http.handler";
import { CartService } from "@/server/cart/cart.service";
import { ProductService } from "@/server/products/product.service";
import { Produto } from "@/shered/shered.types";

export const POST = createRoute(async (req) => {
    const body = await req.json();
    const { products } = body;

    // Caso não haja produtos, retornamos um objeto vazio!
    if (!products) return {};

    // Verificar se os produtos tem no minimo o campo id
    if (!products || !Array.isArray(products) || products.some(p => typeof p !== 'object' || !p.id)) {
        throw new BadRequestError('Todo produto deve ter o campo id');
    }

    // obtendo todos os IDS
    const productsId: string[] = (products as Partial<Produto>[]).filter(p => p.id).map(p => p.id as string);

    // Verificando se a lista contem a mesma quantidade de IDS que a lista de produtos, caso contrário, algum produto não tem ID
    if (productsId.length !== products.length) throw new BadRequestError('Todos os produtos devem conter o campo id');

    // Obter todos os produtos por id
    const service = new ProductService();
    const productsById = await service.getProductsByIds(productsId);

    // Aplicar verificação de diferença entre os produtos do banco e do carrinho
    const cartService = new CartService();
    const productsWithStatus = cartService.verifyDiferrences(productsById, products);

    // Retornar os produtos com o status de validação
    return productsWithStatus
})