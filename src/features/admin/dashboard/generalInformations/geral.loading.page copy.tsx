import { GlobalColors } from '../../../../styles/theme';
import { DashboardCardSkeleton } from './components/card/card.component';

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

export const DashboardGeralViewLoading = async () => {   
    return (
        <section style={sectionStyle}>
            <h2 style={titleStyle}>Visão geral</h2>
            <div style={cardsContainerStyle}>

                <DashboardCardSkeleton/>

                <DashboardCardSkeleton/>

                <DashboardCardSkeleton/>

                <DashboardCardSkeleton/>
            </div>
        </section>
    );
}