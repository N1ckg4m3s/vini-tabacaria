'use client'
import * as s from './style'
import Logo from '@assets/LogoEstenca.svg'
import Carrinho from '@assets/cart.svg'
import Lupa from '@assets/search.svg'
import Menu from '@assets/menu.svg'
import { FormEvent, useRef, useState } from 'react';

/**
 * Componente de navegação principal do site.
 * Contém links para categorias, logo e barra de pesquisa.
 *
 * @component
 * @returns {JSX.Element}
*/
const NavBarComponent = () => {
    /** Referência ao campo de input de busca para evitar renderização completa do componente */
    const searchInput = useRef<HTMLInputElement>(null);

    /** Estado que controla a visibilidade do menu lateral (drawer) em telas pequenas */
    const [drawerAberto, setDrawerAberto] = useState<boolean>(false)

    /**
     * Alterna o estado do drawer (menu lateral).
     * 
     * @param {boolean} estado - Define se o drawer deve estar aberto (true) ou fechado (false).
    */
    const handleBotoesDrawer = (estado: boolean) => {
        setDrawerAberto(estado);
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
            console.log(`Pesquisar por: ${searchInput.current.value}`)
            searchInput.current.value = ''
        }
    }

    return (
        <s.NavBarContainer>
            <s.RedirectContainer>
                <Logo />
                <s.LinksContainer>
                    <s.MenuIcon onClick={() => handleBotoesDrawer(true)} >
                        <Menu />
                    </s.MenuIcon>
                    <s.LinksGroup showdrawer={drawerAberto ? "true" : 'false'}>
                        <s.CloseButton onClick={() => handleBotoesDrawer(false)}>X</s.CloseButton>
                        <s.LinkStyle href='/catalogo?filtro=essencias' nodrawer='true' onClick={() => handleBotoesDrawer(false)}>
                            ESSENCIA
                        </s.LinkStyle>
                        <s.LinkStyle href='/catalogo?filtro=carvaoaluminio' nodrawer='true' onClick={() => handleBotoesDrawer(false)}>
                            CARVAO e ALUMINIO
                        </s.LinkStyle>
                        <s.LinkStyle href='/catalogo?filtro=acessorio' nodrawer='true' onClick={() => handleBotoesDrawer(false)}>
                            ACESSORIO
                        </s.LinkStyle>
                    </s.LinksGroup>
                    <s.LinkStyle href='/carrinho-compras' onClick={() => handleBotoesDrawer(false)}>
                        <span>0,00$</span>
                        <Carrinho />
                    </s.LinkStyle>
                </s.LinksContainer>
            </s.RedirectContainer>

            <s.SearchformContainer onSubmit={handleFormSubmit}>
                <s.SearchInput id='searchInput' type='text' placeholder='Pesquisar...' ref={searchInput} />
                <s.SearchButton type='submit'>
                    <Lupa />
                </s.SearchButton>
            </s.SearchformContainer>
        </s.NavBarContainer>
    );
}
export default NavBarComponent