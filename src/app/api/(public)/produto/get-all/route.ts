import { NextRequest, NextResponse } from "next/server";
import { ProductController } from "@/controller/productContoller";
import { catalogService } from "@/server/catalog/catalog.service";

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
    const service = new catalogService()

    return await service.obterItensPorPagina(request)
}
