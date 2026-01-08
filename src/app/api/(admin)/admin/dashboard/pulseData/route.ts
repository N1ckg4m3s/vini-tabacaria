import { createRoute } from "@/http/http.handler"
import { DashboardService } from "@/server/dashboard/dashboard.service";

export const GET = createRoute(async () => {
    const service = new DashboardService()

    const pulseData = await service.obterUltimos7Dias();

    return pulseData;
})
