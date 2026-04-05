import { DashboardService } from "../../../../server/dashboard/dashboard.service";
import { GlobalColors } from "../../../../styles/theme";
import { FunilFlowStep } from "./components/flow-arrow/funil.component";
import { FunilStep } from "./components/step-card/funil.component";

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

export const funelContainer: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    margin: 'auto',
    flexWrap: 'wrap',
}

export const DashboardFunil = async () => {
    const service = new DashboardService();

    const { views, adds, orders } = await service.getWeekFunel();

    const addRate = views ? Math.floor((adds / views) * 100) : 0;
    const orderRate = adds ? Math.floor((orders / adds) * 100) : 0;


    return (
        <section style={sectionStyle}>
            <h2 style={titleStyle}>Funil de Vendas</h2>

            <div style={funelContainer}>
                <FunilStep title="Views" value={views} />

                <FunilFlowStep porcent={addRate} />

                <FunilStep title="Adds" value={adds} />

                <FunilFlowStep porcent={orderRate} />

                <FunilStep title="Orders" value={orders} />
            </div>
        </section>
    );
}