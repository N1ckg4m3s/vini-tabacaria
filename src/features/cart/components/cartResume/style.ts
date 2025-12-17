import { Theme } from "@/styles/theme";
import styled, { css } from "styled-components";

export const SummaryContainer = styled.aside`
    background: ${Theme.colors.Fundo.cinzaEscuro};
    border: 1px solid ${Theme.colors.Borda.cinzaEscuro27};
    color: ${Theme.colors.Texto.white};
    border-radius: 16px;
    padding: 24px;
    height: fit-content;
`

export const SummaryTitle = styled.h2`
    margin-top: 0;
    margin-bottom: 24px;
`

const summaryLineBase = css`
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
`

export const SummaryLine = styled.div` ${summaryLineBase} `

export const SummaryLine_Muted = styled.div`
    ${summaryLineBase};
    color: ${Theme.colors.Texto.cinzaClaro};
`

export const SummaryTotal = styled.div`
    ${summaryLineBase};
    font-size: 1.2rem;
    font-weight: 700;
    margin: 24px 0;
`

export const FinishButton = styled.button`
    width: 100%;
    padding: 16px;
    border-radius: 14px;
    border: none;
    background: ${Theme.colors.Fundo.VerdeClaro};
    color: #052e16;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        filter: brightness(1.05);
    }
`
