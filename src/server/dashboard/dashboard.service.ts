import { BadRequestError } from "../../http/error/erros.handle";
import { DashboardRepo } from "./dashboard.repo";
import { get7DaysAgoData, normalizeWeekData } from "./dashboard.helper"
import { productConversionData } from "@/shered/shered.types";

export class DashboardService {
    private dashboardRepo = new DashboardRepo()
    async getGeralInfos() {
        const geralInfos = await this.dashboardRepo.getGeralInformations();
        if (!geralInfos) throw new BadRequestError("Não foi possível obter as informações gerais do dashboard.");

        const firstRow = geralInfos[0];

        return {
            todayAcess: firstRow.today_access,
            todayOrders: firstRow.today_orders,
            todayRevenue: firstRow.today_revenue,
        };
    }

    async getWeekFunel() {
        const funelInfos = await this.dashboardRepo.getFunelWeekInformations();
        const firstRow = funelInfos[0];

        if (!funelInfos || !firstRow) throw new BadRequestError("Não foi possível obter as informações do funil da semana.");


        return firstRow;
    }

    async getWeekRevenueData() {
        const weeklyRevenueDataRow = await this.dashboardRepo.getWeekRevenueData()

        const revenueData = normalizeWeekData(weeklyRevenueDataRow.map(row => ({ date: row.day, value: row.total })));

        return revenueData
    }

    async getWeekAccessData(): Promise<number[]> {
        const { hoje, seteDiasAtras } = get7DaysAgoData();

        const weeklyAccessesRow = await this.dashboardRepo.getWeekAccessData({ hoje, seteDiasAtras });

        const acessData = normalizeWeekData(weeklyAccessesRow.map(row => ({ date: row.data, value: row.mobile_access + row.desktop_access })));

        return acessData;
    }

    async getProductsInsights(period: number = 7): Promise<{ top5: productConversionData[], worst5: productConversionData[] }> {
        const insightsData = await this.dashboardRepo.getProductsInsights(period);

        const sorted: productConversionData[] = insightsData.sort((a: productConversionData, b: productConversionData) => b.conversion - a.conversion);

        const top5: productConversionData[] = sorted.slice(0, 5);
        const worst5: productConversionData[] = sorted.slice(-5);

        return { top5, worst5 };
    }
}