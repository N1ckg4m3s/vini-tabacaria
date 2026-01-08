import { DashboardRepo } from "./dashboard.repo";

export class DashboardService {
    private dashboardRepo: DashboardRepo

    constructor() {
        this.dashboardRepo = new DashboardRepo();
    }

    async obterUltimos7Dias() {
        const hoje = new Date().toISOString().split('T')[0];
        const seteDiasAtras = new Date();
        seteDiasAtras.setDate(new Date().getDate() - 7)
        const seteDias = seteDiasAtras.toISOString().split('T')[0]

        return this.dashboardRepo.obterUltimos7Dias({ hoje, seteDiasAtras: seteDias });
    }
}