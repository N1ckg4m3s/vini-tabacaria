import { createRoute } from "@/http/http.handler";
import { filterService } from "@/server/filters/filters.service";

export const POST = createRoute(async (request) => {
    const body = await request.json()

    const { filters } = body;

    const service = new filterService();

    return await service.obterDadosParaFiltragem({ filters })
})
