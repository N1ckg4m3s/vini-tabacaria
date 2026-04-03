'use client'
import { FunilComponent } from '../components/funil/funil.component';
import * as s from './style';

export const DashboardFunil = () => {

    return (
        <section>
            <s.tituloSessao>Funil (7 dias)</s.tituloSessao>

            <FunilComponent
                views={250}
                adds={180}
                buys={50}
            />
        </section>
    );
}