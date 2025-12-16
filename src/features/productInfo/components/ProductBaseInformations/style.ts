import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const ProdutoContainer = styled.div`
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    padding: 0 20px;

    @media screen and (max-width: 900px){
        grid-template-columns: 1fr;
        padding: 0 10px;
    }
`

/* ========== [ IMAGEM ] ========== */
export const ProdutoImagem = styled.section`
    background: ${Theme.colors.Fundo.cinzaEscuro};
    border: 1px solid ${Theme.colors.Borda.cinzaEscuro};
    border-radius: 16px;
    padding: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    justify-self: center;
    aspect-ratio: 1/1;
    width: 100%;
    max-width: 420px;
    max-height: 420px;
`

export const ImagemWarper = styled.div`
    width: 100%;
    height: 100%;
    border: 2px dashed black;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${Theme.colors.Texto.cinzaClaro};
`

export const ImagemPlaceHolder = styled.span`
    display: flex;
    flex-direction: column;
`

/* ========== [ IMAGEM ] ========== */
export const ProductInfoContainer = styled.section`
    display: flex;
    flex-direction: column;
`

export const ProductName = styled.h1`
    font-size: 2.2rem;
    margin: 0;
    line-height: 1.2;
    color: ${Theme.colors.Texto.white};
`

export const ProductMarca = styled.span`
    display: block;
    margin-top: 6px;
    color: ${Theme.colors.Texto.cinzaClaro};
    font-size: 0.95rem;
`

export const ProductPrice = styled.div`
    margin: 24px 0;
    font-size: 2rem;
    font-weight: 700;
    color: ${Theme.colors.Texto.VerdeEscuro};
`

export const ProductEspecification = styled.section`
    border-top: 1px solid ${Theme.colors.Borda.cinzaEscuro};
    padding-top: 24px;
`

export const TitleH2 = styled.h2`
    margin: 0 0 16px 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: ${Theme.colors.Texto.white};
`

export const EspecGrid = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
`

export const EspecItem = styled.li`
    background: ${Theme.colors.Fundo.cinzaEscuro};
    border-top: 1px solid ${Theme.colors.Borda.cinzaEscuro};
    border-radius: 12px;
    padding: 16px;
`

export const EspecItemLabel = styled.span`
    display: block;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: ${Theme.colors.Texto.cinzaClaro};
    margin-bottom: 6px;
`

export const EspecItemValue = styled.span`
    font-size: 0.95rem;
    font-weight: 500;
    color: ${Theme.colors.Texto.white};
`

export const BotaoCompra = styled.button`
    margin-top: auto;
    margin-top: 40px;
    background-color: ${Theme.colors.Fundo.VerdeClaro};
    color: #052e16;
    border: none;
    border-radius: 14px;
    padding: 16px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        filter: brightness(1.05);
    }
`