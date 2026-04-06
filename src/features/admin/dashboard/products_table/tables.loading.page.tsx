import { GlobalColors } from "@/styles/theme";
import { TableSkeleton } from "./components/table-skeleton/table.component";
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

export const DashboardTablesSkeleton = () => {
    return (
        <section style={sectionStyle}>
            <h3 style={titleStyle}>Tabelas</h3>

            <h3>🔴 Problemas</h3>
            <TableSkeleton />

            <h3>🟢 Destaques</h3>
            <TableSkeleton />
        </section>
    );
}