import { createRoute } from "@/http/http.handler";
import { catalogService } from "@/server/catalog/catalog.service";

export const GET = createRoute(async (request) => {
    const { searchParams } = request.nextUrl;

    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const perPage = Math.max(Number(searchParams.get("limit_per_page") || 10), 1);
    const filters = JSON.parse(searchParams.get("filters") || "{}");
    const search = searchParams.get("search") || ""

    const service = new catalogService();

    return service.obterItensPorPagina({
        page,
        perPage,
        filters,
        search
    });
});
