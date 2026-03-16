import styled, { css } from 'styled-components';
import Link from "next/link";
import { buttonReset, flexCenter, flexSpaceBetween, WhiteRoundedBorder } from "@/styles/mixins";
import { GlobalColors } from "@/styles/theme"; // to update

/* CONTAINER DA NAVBAR */
export const NavBarContainer = styled.nav`
    ${flexCenter}
    padding:10px;
    flex-direction: column;
    gap: 10px;
`

/* CONTEUDO PRIMARIO LINKS E LOGOS */
export const RedirectContainer = styled.div`
    ${flexSpaceBetween}
    width: 100%;
    padding: 0 clamp(10px, 5vw, 80px);
`

export const LinksContainer = styled.div`
    ${WhiteRoundedBorder};
    ${flexCenter};
    padding: 8px clamp(20px, 5vw, 50px);
    gap: 20px;
`

export const LinkStyle = styled(Link) <{ $noStyle?: boolean }>`
  color: ${GlobalColors.Text.secondary};
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  ${({ $noStyle }) =>
        !$noStyle && css`
        @media screen and (width< 750px) {
            width: 100%;
            padding: 12px 16px;

            background-color: ${GlobalColors.Neutral[550]};
            color: ${GlobalColors.Text.primary};

            border-radius: 8px;
            border: 1px solid ${GlobalColors.Border.strong};

            font-weight: 600;
            text-align: left;

            transition: background 0.2s ease, transform 0.1s ease;

            &:hover {
                background-color: ${GlobalColors.Neutral[400]};
            }

            &:active {
                transform: scale(0.98);
            }
        }
    `}
`;

/* RESPONSIVIDADE */
export const LinksGroup = styled.div<{ $showdrawer: boolean }>`
    ${flexCenter};
    gap: 20px;

    @media screen and (max-width: 750px) {
        display: ${({ $showdrawer }) => ($showdrawer ? "flex" : "none")};
        position: fixed;
        min-width: 300px;
        width: 25vw;
        height: 100vh;
        top: 0;
        right: 0;
        flex-direction: column;
        justify-content: start;
        background-color: ${GlobalColors.Neutral[600]};
        z-index: 10;
        padding: clamp(20px, 5vw, 50px) clamp(20px, 5vw, 50px);
    }
`

export const CloseButton = styled.button`
    color: ${GlobalColors.Text.secondary};
    ${buttonReset}
    display: none;
    width: 100%;
    text-align: right;
    font-size: 20px;

    @media screen and (max-width: 750px) {
        display: block;
    }
`

export const MenuIcon = styled.button`
    ${flexCenter};
    ${buttonReset}
    gap: 20px;
    display: none;
    @media screen and (max-width: 750px) {
        display: block;
    }
`

/* CONTEUDO SECUNDARIO SARCHBAR */
export const SearchformContainer = styled.form`
    position: relative;
    max-width:650px;
    width: 100%;
`

export const SearchInput = styled.input`
    ${WhiteRoundedBorder};
    color:${GlobalColors.Text.primary};
    width: 100%;
    height: 30px;
    background-color: transparent;
    padding:0 70px 0 20px;
`

export const SearchButton = styled.button`
    ${buttonReset};
    width: 30px;
    height: 30px;
    top: 2.5px;
    right: 20px;
    position: absolute;
`