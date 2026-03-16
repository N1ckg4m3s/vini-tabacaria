import { DashboardRepo } from "./dashboard.repo";

export class DashboardService {
    private dashboardRepo = new DashboardRepo()

    async obterUltimos7Dias() {
        const hoje = new Date().toISOString().split('T')[0];
        const seteDiasAtras = new Date();
        seteDiasAtras.setDate(new Date().getDate() - 7)
        const seteDias = seteDiasAtras.toISOString().split('T')[0]

        return this.dashboardRepo.obterUserViewsUltimos7Dias({ hoje, seteDiasAtras: seteDias });
    }

    async obterProdutosInsites() {
        const hoje = new Date().toISOString().split('T')[0];
        const seteDiasAtras = new Date();
        seteDiasAtras.setDate(new Date().getDate() - 7)
        const seteDias = seteDiasAtras.toISOString().split('T')[0]

        const ViewedProducts = await this.dashboardRepo.obterInsitesProdutosMaisVistos({ hoje, seteDiasAtras: seteDias });

        const CartStats = await this.dashboardRepo.obterInsitesProdutosMovimentadosNoCarrinho();

        return { ViewedProducts, CartStats };
    }
}