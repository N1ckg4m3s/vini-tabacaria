import styled, { css } from 'styled-components';
import Link from "next/link";
import { buttonReset, flexCenter, flexSpaceBetween, WhiteRoundedBorder } from "@/styles/mixins";
import { Theme } from "@/styles/theme";

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

export const LinkStyle = styled(Link) <{ $nodrawer?: string }>`
  color: ${Theme.colors.Texto.cinzaClaro};
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  ${({ $nodrawer }) =>
        $nodrawer == "true" &&
        css`
            @media screen and (max-width: 750px) {
                width: 100%;
                background-color: ${Theme.colors.Fundo.cinzaEscuro};
                padding: 10px 0;
                border-radius: 10px;
                color: ${Theme.colors.Texto.black};
                border: 1px solid black;
                font-weight: bold;
            }
    `}
`;

/* RESPONSIVIDADE */
export const LinksGroup = styled.div<{ $showdrawer: string }>`
    ${flexCenter};
    gap: 20px;

    @media screen and (max-width: 750px) {
        display: ${({ $showdrawer }) => ($showdrawer === "true" ? "flex" : "none")};
        position: absolute;
        min-width: 380px;
        width: 25vw;
        height: 100vh;
        top: 0;
        right: 0;
        flex-direction: column;
        justify-content: start;
        background-color: ${Theme.colors.Fundo.cinzaEscuro_c9};
        z-index: 10;
        padding: clamp(20px, 5vw, 50px) clamp(20px, 5vw, 50px);
    }
`

export const CloseButton = styled.button`
    color: ${Theme.colors.Texto.cinzaClaro};
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
    color:${Theme.colors.Texto.white};
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