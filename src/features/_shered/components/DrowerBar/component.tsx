'use client'

import * as s from './style'
import { useState } from 'react'

export const DrowerBarComponent = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <s.NavContainer
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            $isOpen={isOpen}
        >

            <s.NavTitleContainer>
                <s.MenuIcon $isOpen={!isOpen} size={20} />
                <s.NavTitle $isOpen={isOpen}>Admin</s.NavTitle>
            </s.NavTitleContainer>

            <s.NavLinks>
                <s.NavItem href='/admin'>
                    <s.LayoutDashboardIcon size={20} />
                    <s.NavLabel $isOpen={isOpen}>Dashboard</s.NavLabel>
                </s.NavItem>

                <s.NavItem href='/catalogo'>
                    <s.StoreIcon size={20} />
                    <s.NavLabel $isOpen={isOpen}>Catálogo</s.NavLabel>
                </s.NavItem>

                <s.NavItem href='/admin/product/list'>
                    <s.PackageIcon size={20} />
                    <s.NavLabel $isOpen={isOpen}>Lista</s.NavLabel>
                </s.NavItem>

                <s.NavItem href='/admin/product/new'>
                    <s.PlusCircleIcon size={20} />
                    <s.NavLabel $isOpen={isOpen}>Adicionar</s.NavLabel>
                </s.NavItem>

                <s.NavItem href='/admin/order'>
                    <s.ListIcon size={20} />
                    <s.NavLabel $isOpen={isOpen}>Pedidos</s.NavLabel>
                </s.NavItem>
            </s.NavLinks>
        </s.NavContainer>
    )
}