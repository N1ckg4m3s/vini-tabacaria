'use client'
import styled from "styled-components";
import CatalogoComponent from "./catalogo/catalogo";
import FiltroCatalogoComponent from "./filtro-para-o-catalogo/filter";
import { useParams } from "next/navigation";

const ContainerPagina = styled.article`
    display: flex;
    max-width: 1280px;
    margin: 0 clamp(0px, 50%, calc((100% - 1280px)/2));
    padding: 0 16px;
    width: 100%;
    gap: 10px;
`

/**
 * Essa pagina tem como foco:
 * - Exibição do conteudo
 * - Organização dos componentes
*/
const Catalogo = () => {
    const { filtro, _search } = useParams();

    return (
        <ContainerPagina>
            <FiltroCatalogoComponent
                filter={(filtro ?? '').toString()}
            />
            <CatalogoComponent />
        </ContainerPagina>
    );
};

export default Catalogo;