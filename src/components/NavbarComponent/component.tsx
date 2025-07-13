'use client'
import * as s from './style'
import Logo from '@assets/LogoEstenca.svg'
import Carrinho from '@assets/cart.svg'
import Lupa from '@assets/search.svg'
import Menu from '@assets/menu.svg'
import { FormEvent, useRef, useState } from 'react';
import { useSearchParams, useRouter, ReadonlyURLSearchParams } from 'next/navigation'
import GenerateLink from './linkComponent'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

/**
 * Componente de navegação principal do site.
 * Contém links para categorias, logo e barra de pesquisa.
 *
 * @component
 * @returns {JSX.Element}
*/
const NavBarComponent = () => {
    /* ==================== [ Hooks ] ==================== */
    /** Obtem os dados de parametro na URL */
    const searchParams: ReadonlyURLSearchParams = useSearchParams();

    /** obtem os dados de parametro na URL */
    const router: AppRouterInstance = useRouter()

    /** Referência ao campo de input de busca para evitar renderização completa do componente */
    const searchInput = useRef<HTMLInputElement>(null);

    /** Estado que controla a visibilidade do menu lateral (drawer) em telas pequenas */
    const [drawerAberto, setDrawerAberto] = useState<boolean>(false)

    /* ==================== [ linkRedirecionadores ] ==================== */
    const linkRedirecionadores = [
        { filtro: 'essencias', titulo: 'ESSENCIA' },
        { filtro: 'carvaoaluminio', titulo: 'CARVAO e ALUMINIO' },
        { filtro: 'acessorio', titulo: 'ACESSORIO' },
    ];

    /* ==================== [ Auxiliares ] ==================== */

    /**
     * Alterna o estado do drawer (menu lateral).
     * 
     * @param {boolean} estado - Define se o drawer deve estar aberto (true) ou fechado (false).
    */
    const handleBotoesDrawer = (estado: boolean) => {
        setDrawerAberto(estado);
    }

    /**
     * Centraliza a obtenção dos parametros na URL.
     *
     * @returns {
     *  searchValue: string
     *  filtro: string
     * }
    */
    const getSearchParamsData = () => {
        const searchValue: string = searchInput!.current!.value.trim()
        const filtro: string = searchParams.get('filtro') ?? '';
        return { searchValue, filtro }
    }

    /**
     * Atualiza a Url para obtenção dos novos dados com base:
     * - Filtros por tipo
     * - Pesquisa do usuario
     * 
     * @param {string} filtro 
     * @param {string} searchValue 
     */
    const atualizarUrl = (filtro: string, searchValue: string) => {
        router.push(generateHref(filtro, searchValue))
    }

    /**
     * Manipula o envio do formulário de busca.
     * Evita recarregamento da página, coleta o valor do input e reseta o campo.
     *
     * @param event - Evento de envio do formulário (submit).
    */
    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchInput.current !== null) {
            const { searchValue, filtro } = getSearchParamsData()
            searchInput.current.value = ''

            atualizarUrl(filtro, searchValue)
        }
    }

    /**
     * Função para gerar a Href unindo o filtro determinado com a pesquisa
     * @param {string} filtro -- filtro para o catalogo
     * @param {string?} searchParam -- dado customizado de pesquisa
     * 
     * @returns {string}
     * */
    const generateHref = (filtro: string, searchParam?: string) => {
        const search: string = searchParams.get('search') ?? '';

        const searchData: string = (searchParam ?? search).toString();

        return `/catalogo?filtro=${filtro}&search=${searchData}`
    }

    /* ==================== [ Render ] ==================== */
    /**
     * Renderiza o component de Link evitando duplicação
     * 
     * @param filtro 
     * @param titulo 
     * @returns 
    */
    const renderLink = (filtro: string, titulo: string) => (
        <GenerateLink
            key={filtro}
            filtro={filtro}
            titulo={titulo}
            generateHref={generateHref}
            handleBotoesDrawer={handleBotoesDrawer}
        />
    );

    return (
        <s.NavBarContainer>
            <s.RedirectContainer>
                <Logo role='img' aria-label='Logo da loja' />
                <s.LinksContainer>
                    <s.MenuIcon
                        type='button'
                        onClick={() => handleBotoesDrawer(true)}
                        aria-label='Abrir menu de navegação'
                        aria-expanded={drawerAberto ? 'true' : 'false'}
                        aria-controls="menu-lateral"
                    >
                        <Menu />
                    </s.MenuIcon>
                    <s.LinksGroup
                        $showdrawer={drawerAberto ? "true" : 'false'}
                        id="menu-lateral"
                    >
                        <s.CloseButton
                            onClick={() => handleBotoesDrawer(false)}
                            aria-label='Fechar menu de navegação'>X</s.CloseButton>

                        {linkRedirecionadores.map(({ filtro, titulo }) => renderLink(filtro, titulo))}

                    </s.LinksGroup>
                    <s.LinkStyle
                        href='/carrinho-compras'
                        onClick={() => handleBotoesDrawer(false)}
                        aria-label={`Abrir carrinho de compras, valor atual: ${'0.00$'}`}
                    >
                        <span>0,00$</span>
                        <Carrinho />
                    </s.LinkStyle>
                </s.LinksContainer>
            </s.RedirectContainer>

            <s.SearchformContainer onSubmit={handleFormSubmit}>
                <s.SearchInput
                    id='searchInput'
                    type='text'
                    placeholder='Pesquisar...'
                    ref={searchInput}
                    aria-label='barra de pesquisa'
                />
                <s.SearchButton type='submit'>
                    <Lupa />
                </s.SearchButton>
            </s.SearchformContainer>
        </s.NavBarContainer >
    );
}
export default NavBarComponent