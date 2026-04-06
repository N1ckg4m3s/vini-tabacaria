import { GlobalColors } from '@/styles/theme';
import { LineChartSkeleton } from './components/chart-skeleton/chart.skeeton.component';

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

export const DashboardTendenciaLoading = () => {
    return (
        <section style={sectionStyle}>
            <h2 style={titleStyle}>Tendência (7 dias)</h2>
            <div style={chartContainerStyle}>
                <LineChartSkeleton/>
                <LineChartSkeleton/>
            </div>
        </section>
    );
}