import { DashboardService } from '@/server/dashboard/dashboard.service';
import { GlobalColors } from '@/styles/theme';
import { formatePrice } from '@/features/_shered/services/formaters/price.formater';
import { DashboardCard } from './components/card/card.component';

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

const cardsContainerStyle: React.CSSProperties = {
    display: 'grid',
    gap: '20px',
    flexWrap: 'wrap',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',

};

export const DashboardGeralView = async () => {
    const service = new DashboardService();
    const { todayAcess, todayOrders, todayRevenue } = await service.getGeralInfos();

    const weekConversion = todayAcess > 0 ? (todayOrders / todayAcess) * 100 : 0;

    return (
        <section style={sectionStyle}>
            <h2 style={titleStyle}>Visão geral</h2>
            <div style={cardsContainerStyle}>
                <DashboardCard
                    title='Receitas Hoje'
                    value={formatePrice(todayRevenue)}
                    obs='comparando a ontem'
                />

                <DashboardCard
                    title='Pedidos Hoje'
                    value={todayOrders.toString()}
                    obs='total de pedidos'
                />

                <DashboardCard
                    title='Conversão (7 dias)'
                    value={`${weekConversion.toFixed(2)}%`}
                    obs='pedidos / acessos'
                />

                <DashboardCard
                    title='Acessos Hoje'
                    value={todayAcess.toString()}
                    obs='última atualização agora'
                />
            </div>
        </section>
    );
}