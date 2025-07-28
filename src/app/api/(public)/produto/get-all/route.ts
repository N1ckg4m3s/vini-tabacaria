import { NextRequest, NextResponse } from "next/server";
import { ProductController } from "@/controller/productContoller";

/**
 * Obtém os itens do catálogo com base na paginação.
 *
 * Parâmetros passados via URL:
 * - page {number} Página atual do cliente (default: 1)
 * - limit_per_page {number} Quantidade de itens por página (default: 10)
 *
 * Caso parâmetros não sejam passados ou estejam inválidos, valores padrão serão usados.
 *
 * @returns {Object} Dados paginados contendo:
 *  - currentPage {number} Página atual
 *  - totalPages {number} Número total de páginas
 *  - totalItems {number} Quantidade total de itens
 *  - limitPerPage {number} Quantidade de itens por página
 *  - items {Produto[]} Lista de produtos da página
 *
 * Exemplo de resposta:
 * {
 *   "currentPage": 1,
 *   "totalPages": 5,
 *   "totalItems": 50,
 *   "limitPerPage": 10,
 *   "items": [ /* array de produtos *\/ ]
 * }
*/


export async function GET(request: NextRequest) {
    /* obtem os parametros passados */
    const { searchParams } = request.nextUrl;

    // inicializa localmente o contrutos
    const controller = new ProductController()

    /* obtendo os parametros da quantidade de itene e pagina */
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limitPerPage = parseInt(searchParams.get("limit_per_page") || "10", 10);

    const from = Math.max(page - 1, 0) * limitPerPage;
    const to = from + limitPerPage - 1;

    /* obter todos os produtos com base na pagina */
    const allProducts = await controller.getAllProductsByPage(from, to);

    /* calcular a quantidade de itens e paginas */
    const totalItems = allProducts.length;
    const totalPages = Math.ceil(totalItems / limitPerPage);

    return NextResponse.json(
        {
            page,
            totalPages,
            totalItems,
            limitPerPage,
            items: allProducts
        },
        { status: 200 }
    );
}
