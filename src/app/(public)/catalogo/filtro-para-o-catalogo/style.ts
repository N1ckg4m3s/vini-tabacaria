import { buttonReset, flexColumn } from "@/styles/mixins";
import { Theme } from "@/styles/theme";
import { styled, css } from "styled-components";

const ContainerBase = css`
    width: 100%;
    height: fit-content;
    border-radius: 20px;
    padding: 5px;
`

export const FilterContainer = styled.form`
    ${ContainerBase};
    ${flexColumn};
    max-width: 250px;
    background-color: ${Theme.colors.Fundo.cinzaEscuro};
    gap: 10px;
`

export const FilterTitle = styled.button`
    ${buttonReset}
    width: 100%;
    font-size: 20px;
    text-align: center;
    text-transform:uppercase;
    color: ${Theme.colors.Texto.white};
`

export const FilterButtonSubmit = styled.button`
    ${buttonReset};
    ${ContainerBase};
    width: 100%;
    font-size: 20px;
    text-align: center;
    text-transform: uppercase;
    color: ${Theme.colors.Texto.white};
    border: 1px solid ${Theme.colors.Borda.white};
`