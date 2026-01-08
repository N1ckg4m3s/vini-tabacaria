'use client'

import { DashboardCard } from '../components/card/card.component';
import { DashboardTable } from '../components/table/table.component';
import { useActions } from '../hooks/useActions';
import { useDirections } from '../hooks/useDirections';
import { usePulse } from '../hooks/usePulse';
import * as s from './style';

export const DashboardPage = () => {
    const { todayAcess, topDevice, topDevicePercentage, weeklyAccesses } = usePulse();
    const { ViewedProducts, CartStats } = useDirections();
    const { } = useActions();

    return (
        <s.dashboardContainer>

            {/* Row 1: Pulse */}
            <s.row3Coluns>
                <DashboardCard title="Hoje" metric={todayAcess} sub="última atualização agora" />
                <DashboardCard title="Acessos (7 dias)" metric={weeklyAccesses} sub="soma dos acessos" />
                <DashboardCard title="Dispositivo" metric={topDevice} sub={`${topDevicePercentage}% dos acessos`} />
            </s.row3Coluns>

            {/* Row 2: Direction */}
            <s.row2Coluns>
                <DashboardTable title="Produtos mais vistos (7 dias)" items={ViewedProducts} />
                <DashboardTable title="Carrinho (7 dias)" items={CartStats} />
            </s.row2Coluns>

            {/* Row 3: Action */}
            <s.actionsContainer>
                <s.actionCard>
                    Gerenciar Produtos
                    <s.actionSpan>listar / editar</s.actionSpan>
                </s.actionCard>
                <s.actionCard>
                    Novo Produto
                    <s.actionSpan>cadastro rápido</s.actionSpan>
                </s.actionCard>
                <s.actionCard>
                    Ver Catálogo
                    <s.actionSpan>visão do cliente</s.actionSpan>
                </s.actionCard>
            </s.actionsContainer>
        </s.dashboardContainer>
    );
}