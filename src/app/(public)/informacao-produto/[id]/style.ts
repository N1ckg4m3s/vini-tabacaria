import { buttonReset, flexCenter, flexColumn, flexSpaceBetween } from "@/styles/mixins";
import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const InformacaoContainer = styled.div`
    ${flexCenter};
    flex-wrap: wrap;
    min-height: 220px;
    height: max-content;
    width: 100%;
    font-size: 14px;
    gap: 20px;
    color: ${Theme.colors.Texto.white};
`

export const ImagemProduto = styled.img`
    max-width: 220px;
    height: auto;
    aspect-ratio: 1/1;
    border-radius: 10px;
`

export const DescricaoContainer = styled.div`
    width: 350px;
    height: -webkit-fill-available;
    ${flexColumn}
    align-items: center;
    gap: 5px;
`

export const DescricaoProduto = styled.span` align-self: flex-start; `

export const ContainerJustfyArround = styled.section`
    width: 100%;
    ${flexSpaceBetween}
`

export const TextoSubTotal = styled.span`
    font-size: 20px;
`

export const QuantidadeInput = styled.input`
    outline: none;
    width: 150px;
    height: 30px;
    background-color: transparent;
    border: 1px solid ${Theme.colors.Borda.white};
    border-radius: 20px;
    padding: 0 10px;
    color: ${Theme.colors.Texto.white};
`

export const BotaoAdicionar = styled.button`
    ${buttonReset}
    ${flexCenter}
    border-radius: 20px;
    gap: 20px;
    padding: 5px 30px;
    color: ${Theme.colors.Texto.white};
    background-color:  ${Theme.colors.Fundo.VerdeClaro};
`