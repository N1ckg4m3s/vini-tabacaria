import { GlobalColors } from "@/styles/theme"; // to update
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
    background: ${GlobalColors.Neutral[600]};
    border: 1px solid ${GlobalColors.Border.subtle};
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
    border: 2px dashed ${GlobalColors.Border.subtle};
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${GlobalColors.Text.secondary};
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
    color: ${GlobalColors.Text.primary};
`

export const ProductMarca = styled.span`
    display: block;
    margin-top: 6px;
    color: ${GlobalColors.Text.secondary};
    font-size: 0.95rem;
`

export const ProductPrice = styled.div`
    margin: 24px 0;
    font-size: 2rem;
    font-weight: 700;
    color: ${GlobalColors.Primary.strong};
`

export const ProductEspecification = styled.section`
    border-top: 1px solid ${GlobalColors.Border.subtle};
    padding-top: 24px;
`

export const TitleH2 = styled.h2`
    margin: 0 0 16px 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: ${GlobalColors.Text.primary};
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
    background: ${GlobalColors.Neutral[600]};
    border-top: 1px solid ${GlobalColors.Border.subtle};
    border-radius: 12px;
    padding: 16px;
`

export const EspecItemLabel = styled.span`
    display: block;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: ${GlobalColors.Text.secondary};
    margin-bottom: 6px;
`

export const EspecItemValue = styled.span`
    font-size: 0.95rem;
    font-weight: 500;
    color: ${GlobalColors.Text.primary};
`