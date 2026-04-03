'use client'
import { LineChartComponent } from '../components/chart/chart.component';
import * as s from './style';

export const DashboardTendencia = () => {

    return (
        <s.funelSection>
            <s.tituloSessao>Tendência (7 dias)</s.tituloSessao>
            <s.charsList>
                <LineChartComponent
                    title='Receita'
                    labels={['Seg', 'Ter', 'Qua', 'Qui', 'Sex']}
                    data={[50, 40, 60, 80, 70]}
                />

                <LineChartComponent
                    title='Acessos'
                    labels={['Seg', 'Ter', 'Qua', 'Qui', 'Sex']}
                    data={[10, 20, 15, 25, 30]}
                />
            </s.charsList>
        </s.funelSection>
    );
}