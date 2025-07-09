'use client'
import styled from "styled-components";
import CatalogoComponent from "./catalogo/catalogo";
import FiltroCatalogoComponent from "./filtro-para-o-catalogo/filter";

const ContainerPagina = styled.article`
    display: flex;
    max-width: 1280px;
    margin: 0 clamp(0px, 50%, calc((100% - 1280px)/2));
    padding: 0 16px;
    width: 100%;
`
/**
 * Essa pagina tem como foco:
 * - Exibição do conteudo
 * - Organização dos componentes
*/


const Catalogo = () => {
    return (
        <ContainerPagina>
            <FiltroCatalogoComponent />
            <CatalogoComponent />
        </ContainerPagina>
    );
};

export default Catalogo;