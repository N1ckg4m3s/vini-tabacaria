import { SupabaseClient } from "@supabase/supabase-js";
import { CartIntentionRow, getLast7DaysParams, getLast7DaysProps } from "./dashboard.types";
import suprabase from "../connections/supraBaseConnection";
import { NoResponseError } from "@/http/error/erros.handle";

export class DashboardRepo {
    private supra: SupabaseClient<any, "public", any>;
    constructor() { this.supra = suprabase }

    obterUserViewsUltimos7Dias: getLast7DaysProps = async (params) => {
        const { hoje, seteDiasAtras } = params;

        const { data: weeklyAccessData } = await this.supra.from('analytics_daily_access')
            .select('*')
            .gte('data', seteDiasAtras)
            .lte('data', hoje);

        if (!weeklyAccessData) throw new NoResponseError("Sem dados de acesso para os últimos 7 dias.");

        /* Acessos do dia */
        const today = weeklyAccessData?.find(d => d.data === hoje);
        const todayAcess = ((today.mobile_access || 0) + (today.desktop_access || 0)) || null;

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

    obterInsitesProdutosMaisVistos = async ({ hoje, seteDiasAtras }: getLast7DaysParams) => {
        const { data: weeklyProductViews } = await this.supra.from('analytics_daily_product_views')
            .select(`
                *,
                products(
                    tipo,
                    nome,
                    marca
                )
            `)
            .gte('data', seteDiasAtras)
            .lte('data', hoje)
            .limit(5)
            .order('views', { ascending: false });

        if (!weeklyProductViews) throw new NoResponseError("Sem dados de visualização de produtos para os últimos 7 dias.");

        return weeklyProductViews.map(view => ({
            productId: view.product_id,
            productName: view.products.nome,
            productBrand: view.products.marca,
            productType: view.products.tipo,
            views: view.views,
        }));
    }

    obterInsitesProdutosMovimentadosNoCarrinho = async ({ hoje, seteDiasAtras }: getLast7DaysParams) => {
        const { data } = await this.supra
            .from('analytics_cart_product_intention')
            .select(`
                product_id,
                total_added,
                total_removed,
                intention_score,
                products (
                    nome,
                    marca,
                    tipo
                )
            `)
            .order('intention_score', { ascending: false })
            .limit(5);

        const weeklyProductInterest = data as unknown as CartIntentionRow[];

        if (!weeklyProductInterest) throw new NoResponseError("Sem dados de visualização de produtos para os últimos 7 dias.");

        return weeklyProductInterest.map(view => ({
            productId: view.product_id,
            productName: view.products.nome,
            productBrand: view.products.marca,
            productType: view.products.tipo,
            addedCount: view.total_added,
            removedCount: view.total_removed,
            intentionScore: view.intention_score,
        }));
    }
}