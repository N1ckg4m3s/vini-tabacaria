'use client'
/**
 * Essa pagina tem como foco:
 * - Exibição do conteudo
 * - Organização dos componentes
 * - Centralização dos Meta Dados
*/

import CatalogoComponent from "./catalogo/catalogo";
import FiltroCatalogoComponent from "./filtro-para-o-catalogo/filter";

// export const metadata = {
//     title: 'Catalogo',
// }

const Catalogo = () => {
    return (
        <>
            <FiltroCatalogoComponent />
            <CatalogoComponent />
        </>
    );
};

export default Catalogo;
