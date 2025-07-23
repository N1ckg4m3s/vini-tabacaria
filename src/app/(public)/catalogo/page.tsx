'use client'
import CatalogoComponent from "./catalogo/catalogo";
import FiltroCatalogoComponent from "./filtro-para-o-catalogo/filter";
import { useParams } from "next/navigation";
import { ContainerPagina } from "@/styles/mixins";

/**
 * Essa pagina tem como foco:
 * - Exibição do conteudo
 * - Organização dos componentes
*/
const Catalogo = () => {
    /**
     * Parametros passados pela URL
     * 
     * filtro: identificador de esoecificação do produto:
     *  - Essencia
     *  - Carvão e Aluminio
     *  - Acessorio
     * 
     * search: Pesquisa atual do usuario.
    */
    const { filtro, search } = useParams();

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