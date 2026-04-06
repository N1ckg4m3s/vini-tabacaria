import { DashboardService } from "@/server/dashboard/dashboard.service";
import { GlobalColors } from "@/styles/theme";
import { DashboardTable } from "./components/table/table.component";

/* CSS style */
const sectionStyle: React.CSSProperties = {
    padding: '20px',
    backgroundColor: GlobalColors.Neutral[800],
    borderRadius: '8px',
    marginBottom: '20px',
};

const titleStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
};

export const DashboardTables = async () => {
    const service = new DashboardService();
    const { top5, worst5 } = await service.getProductsInsights(7);

    return (
        <section style={sectionStyle}>
            <h3 style={titleStyle}>Tabelas</h3>

            <h3>🟢 Destaques</h3>
            <DashboardTable data={top5} />

            <h3>🔴 Problemas</h3>
            <DashboardTable data={worst5} />
        </section>
    );
}