import { createRoute } from "@/http/http.handler";
import { catalogService } from "@/server/catalog/catalog.service";

export const GET = createRoute(async (request) => {
    const { searchParams } = request.nextUrl;

    const filters = JSON.parse(searchParams.get("filters") || "{}");

    const service = new catalogService();

    return await service.obterDadosParaFiltragem({ filters })
})
