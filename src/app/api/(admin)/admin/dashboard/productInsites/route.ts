import { createRoute } from "@/http/http.handler"
import { DashboardService } from "@/server/dashboard/dashboard.service";

export const GET = createRoute(async () => {
    const service = new DashboardService()

    return await service.obterProdutosInsites();
})
