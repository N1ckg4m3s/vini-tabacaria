import { GlobalColors } from "../../../../styles/theme";
import { FunilFlowStepSkeleton } from "./components/flow-arrow/funil.component";
import { FunilStepSkeleton } from "./components/step-card/funil.component";

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

export const DashboardFunilLoading = async () => {
    return (
        <section style={sectionStyle}>
            <h2 style={titleStyle}>Funil de Vendas</h2>

            <div style={funelContainer}>
                <FunilStepSkeleton />

                <FunilFlowStepSkeleton />

                <FunilStepSkeleton />

                <FunilFlowStepSkeleton />

                <FunilStepSkeleton />
            </div>
        </section>
    );
}