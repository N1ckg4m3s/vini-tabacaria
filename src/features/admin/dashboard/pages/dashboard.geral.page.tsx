'use client'

import { DashboardCard } from '../components/card/card.component';
import * as s from './style';

export const DashboardGeralView = () => {
    return (
        <section>
            <s.tituloSessao>Visão geral</s.tituloSessao>
            <s.cardsList>
                <DashboardCard
                    title='Receitas Hoje'
                    value={'R$: 0,00'}
                    obs='comparando a ontem'
                />

                <DashboardCard
                    title='Pedidos Hoje'
                    value={'0'}
                    obs='total de pedidos'
                />

                <DashboardCard
                    title='Conversão'
                    value={'##%'}
                    obs='pedidos / acessos'
                />

                <DashboardCard
                    title='Acessos Hoje'
                    value={'0'}
                    obs='última atualização agora'
                />

                <DashboardCard
                    title='Distribuição'
                    value={'###'}
                    obs='###% dos acessos'
                />
            </s.cardsList>
        </section>
    );
}