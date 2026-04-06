import { CSSProperties, Suspense } from "react";
import { GlobalColors } from "../../../styles/theme";
import { DashboardGeralView } from "../../../features/admin/dashboard/generalInformations/dashboard.geral.page";
import { DashboardTendencia } from "../../../features/admin/dashboard/tendency/dashboard.tendencia.page";
import { DashboardFunil } from "../../../features/admin/dashboard/funel/dashboard.funil.page";
import { DashboardTables } from "../../../features/admin/dashboard/products_table/dashboard.tables.page";
import { DashboardFunilLoading } from "../../../features/admin/dashboard/funel/funil.loading.page";
import { DashboardGeralViewLoading } from "../../../features/admin/dashboard/generalInformations/geral.loading.page copy";
import { DashboardTendenciaLoading } from "../../../features/admin/dashboard/tendency/tendencia.loading.page";
import { DashboardTablesSkeleton } from "../../../features/admin/dashboard/products_table/tables.loading.page";

// container
const dashboardContainer: CSSProperties = {
    padding: '24px',
    display: 'grid',
    gridTemplateRows: 'auto auto auto',
    gap: '24px',

    color: GlobalColors.Text.primary
}

export default async function Page() {
    return <>
        <div style={dashboardContainer}>
            <Suspense fallback={<DashboardGeralViewLoading />}>
                <DashboardGeralView />
            </Suspense>

            <Suspense fallback={<DashboardTendenciaLoading />}>
                <DashboardTendencia />
            </Suspense>

            <Suspense fallback={<DashboardFunilLoading />}>
                <DashboardFunil />
            </Suspense>

            <Suspense fallback={<DashboardTablesSkeleton />}>
                <DashboardTables />
            </Suspense>
        </div>
    </>
}