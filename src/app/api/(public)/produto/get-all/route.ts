import { createRoute } from "@/http/http.handler";
import { catalogService } from "@/server/catalog/catalog.service";

export const POST = createRoute(async (request) => {
    const body = await request.json()

    const { page, filters, search, limit_per_page } = body

    const service = new catalogService();

    return service.obterItensPorPagina({
        page: page || 1,
        perPage: limit_per_page || 10,
        filters: filters || {},
        search: search || ''
    });
});
