import styled, { css } from 'styled-components'
import Link from 'next/link'
import { LayoutDashboard, Package, PlusCircle, Store, Menu, List } from 'lucide-react'

export const NavContainer = styled.aside<{ $isOpen: boolean }>`
    background: #161616;
    border-right: 1px solid #2a2a2a;
    height: 100vh;
    padding: 24px 12px;
    z-index: 2;

    width: ${({ $isOpen }) => ($isOpen ? '220px' : '70px')};
    transition: 
        box-shadow .25s ease,
        width .25s ease;

    overflow: hidden;
    position: fixed;
    
    box-shadow: ${({ $isOpen }) =>
        $isOpen
            ? '0 0 0 1px #2a2a2a, 10px 0 20px rgba(0,0,0,0.5)'
            : '0 0 0 1px #2a2a2a'};
`

export const NavLinks = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const animatedItemStyle = css`
    display: flex;
    align-items: center;
    gap: 14px;

    padding: 10px;
    border-radius: 8px;
    color: #cfcfcf;
    text-decoration: none;

    transition: background 0.2s ease;

    &:hover {
        background: #2a2a2a;
        color: white;
    }
`

export const NavTitleContainer = styled.div`${animatedItemStyle}`
export const NavItem = styled(Link)`${animatedItemStyle}`

export const NavLabel = styled.span<{ $isOpen: boolean }>`
    white-space: nowrap;

    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-10px)')};
    
    transition: all 0.2s ease;
`

// icons size
const iconsSize = css`
    min-width: 20px;
    min-height: 20px;
`

export const LayoutDashboardIcon = styled(LayoutDashboard)`${iconsSize}`
export const PackageIcon = styled(Package)`${iconsSize}`
export const PlusCircleIcon = styled(PlusCircle)`${iconsSize}`
export const StoreIcon = styled(Store)`${iconsSize}`
export const ListIcon = styled(List)`${iconsSize}`

export const MenuIcon = styled(Menu) <{ $isOpen: boolean }>`
    ${iconsSize}
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0px)' : 'translateX(-10px)')};
    margin-bottom: ${({ $isOpen }) => ($isOpen ? '4px' : '5px')};
    transition: all 0.2s ease;
`

export const NavTitle = styled.h2<{ $isOpen: boolean }>`
    color: white;

    font-size: ${({ $isOpen }) => ($isOpen ? '20px' : 0)};
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(-30px)' : 'translateX(0px)')};

    transition: all 0.2s ease;
`