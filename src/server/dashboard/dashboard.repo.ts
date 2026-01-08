import { SupabaseClient } from "@supabase/supabase-js";
import { getLast7DaysProps } from "./dashboard.types";
import suprabase from "../connections/supraBaseConnection";
import { NoResponseError } from "@/http/error/erros.handle";

export class DashboardRepo {
    private supra: SupabaseClient<any, "public", any>;
    constructor() { this.supra = suprabase }

    obterUltimos7Dias: getLast7DaysProps = async (params) => {
        const { hoje, seteDiasAtras } = params;

        const { data: weeklyAccessData } = await this.supra.from('analytics_daily_access')
            .select('*')
            .gte('data', seteDiasAtras)
            .lte('data', hoje);

        if (!weeklyAccessData) throw new NoResponseError("Sem dados de acesso para os últimos 7 dias.");
        /*
        weeklyAccessData: [
            { data: '2026-01-07', mobile_access: 0, desktop_access: 2 },
            { data: '2026-01-08', mobile_access: 0, desktop_access: 1 }
        ]
        */

        /* Acessos do dia */
        const today = weeklyAccessData?.find(d => d.data === hoje);
        const todayAcess = (today.mobile_access + today.desktop_access) || null;

        /* ========== Uso durante a semana ========== */
        /* Acessos móveis e desktop durante a semana */
        const weeklyMobileAcess = weeklyAccessData.reduce((acc, day) => acc + day.mobile_access, 0);
        const weeklyDesktopAcess = weeklyAccessData.reduce((acc, day) => acc + day.desktop_access, 0);

        /* Total de usos na semana */
        const weeklyAccesses = weeklyMobileAcess + weeklyDesktopAcess;

        /* Calculo de porcentagem de uso */
        const mobilePercentage = weeklyMobileAcess > 0 ? (weeklyMobileAcess / weeklyAccesses * 100) : 0;
        const desktopPercentage = weeklyDesktopAcess > 0 ? (weeklyDesktopAcess / weeklyAccesses * 100) : 0;

        const topDevicePercentage = Math.max(mobilePercentage, desktopPercentage);

        const topDevice = mobilePercentage >= desktopPercentage ? 'Mobile' : 'Desktop';

        return {
            todayAcess,
            weeklyAccesses,
            topDevice,
            topDevicePercentage,
        }
    }
}