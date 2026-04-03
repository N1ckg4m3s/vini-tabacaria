'use client'
import { DashboardTable } from '../components/table/table.component';
import * as s from './style';

export const DashboardTables = () => {

    return (
        <section>
            <s.tituloSessao>Produtos (7 dias)</s.tituloSessao>

            <h3>🔴 Problemas</h3>
            <DashboardTable />

            <h3>🟢 Destaques</h3>
            <DashboardTable />
        </section>
    );
}