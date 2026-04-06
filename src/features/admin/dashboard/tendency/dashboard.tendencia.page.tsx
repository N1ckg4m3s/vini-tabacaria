import { DashboardService } from '../../../../server/dashboard/dashboard.service';
import { GlobalColors } from '../../../../styles/theme';
import { LineChartComponent } from './components/chart/chart.component';

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

const chartContainerStyle: React.CSSProperties = {
    display: 'grid',
    gap: '20px',
    flexWrap: 'wrap',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gridTemplateRows: '250px',
    justifyItems: 'center',
};

export const DashboardTendencia = async () => {
    const service = new DashboardService();

    const { accessData, revenueData } = await Promise.all([
        service.getWeekAccessData(),
        service.getWeekRevenueData()
    ]).then(([accessData, revenueData]) => {
        return { accessData, revenueData };
    }).catch((error) => {
        console.error("Erro ao obter os dados do dashboard:", error);
        return { accessData: [0, 0, 0, 0, 0, 0, 0], revenueData: [0, 0, 0, 0, 0, 0, 0] };
    });

    return (
        <section style={sectionStyle}>
            <h2 style={titleStyle}>Tendência (7 dias)</h2>
            <div style={chartContainerStyle}>
                <LineChartComponent
                    title='Receita'
                    labels={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', "Sab", "Dom"]}
                    data={revenueData}
                />

                <LineChartComponent
                    title='Acessos'
                    labels={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', "Sab", "Dom"]}
                    data={accessData}
                />
            </div>
        </section>
    );
}