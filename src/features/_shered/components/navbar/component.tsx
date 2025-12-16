'use client'

import * as s from './style'
import Logo from '@assets/LogoEstenca.svg'
import Carrinho from '@assets/cart.svg'
import Lupa from '@assets/search.svg'
import Menu from '@assets/menu.svg'
import { FormEvent, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

const NavBarComponent = () => {
    const router = useRouter()
    const searchInput = useRef<HTMLInputElement>(null)
    const [drawerAberto, setDrawerAberto] = useState(false)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const value = searchInput.current?.value.trim()
        if (!value) return

        searchInput.current!.value = ''
        router.push(`/catalogo?search=${encodeURIComponent(value)}`)
    }

    const closeDrawer = () => setDrawerAberto(false)

    return (
        <s.NavBarContainer>
            <s.RedirectContainer>
                <Logo aria-label="Logo da loja" />

                <s.LinksContainer>
                    <s.MenuIcon
                        type="button"
                        onClick={() => setDrawerAberto(true)}
                        aria-label="Abrir menu"
                        aria-expanded={drawerAberto}
                    >
                        <Menu />
                    </s.MenuIcon>

                    <s.LinksGroup
                        $showdrawer={drawerAberto ? 'true' : 'false'}
                        id="menu-lateral"
                    >
                        <s.CloseButton onClick={closeDrawer}>X</s.CloseButton>

                        <s.LinkStyle href="/catalogo" onClick={closeDrawer}>
                            Catálogo
                        </s.LinkStyle>

                        <s.LinkStyle href="/combos" onClick={closeDrawer}>
                            Combos
                        </s.LinkStyle>

                        <s.LinkStyle href="/promocoes" onClick={closeDrawer}>
                            Promoções
                        </s.LinkStyle>

                        <s.LinkStyle href="/loja" onClick={closeDrawer}>
                            Nossa Loja
                        </s.LinkStyle>
                    </s.LinksGroup>

                    <s.LinkStyle
                        href="/carrinho-compras"
                        onClick={closeDrawer}
                        aria-label="Abrir carrinho"
                    >
                        <span>0,00$</span>
                        <Carrinho />
                    </s.LinkStyle>
                </s.LinksContainer>
            </s.RedirectContainer>

            {/* <s.SearchformContainer onSubmit={handleSubmit}>
                <s.SearchInput
                    ref={searchInput}
                    type="text"
                    placeholder="Pesquisar no catálogo..."
                    aria-label="Pesquisar produtos"
                />
                <s.SearchButton type="submit">
                    <Lupa />
                </s.SearchButton>
            </s.SearchformContainer> */}
        </s.NavBarContainer>
    )
}

export default NavBarComponent
