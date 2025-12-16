import { Theme } from "@/styles/theme";
import styled, { css } from 'styled-components';

export const RelactionTitle = styled.h2`
    margin: 0 0 24px 0;
    font-size: 1.4rem;
    font-weight: 600;
    color: ${Theme.colors.Texto.white};
`

export const Carousel = styled.h2`
    position: relative;
`

const BaseCourselArrow = css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 1px solid ${Theme.colors.Borda.cinzaEscuro};
    background: rgba(24, 24, 27, 0.85);
    color: ${Theme.colors.Texto.white};
    font-size: 22px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
    z-index: 2;

    &:hover {
        background: rgba(39, 39, 42, 0.95);
    }

    &:disabled {
        opacity: 0;
        cursor: default;
    }
`

export const CarouselArrowLeft = styled.button`
    ${BaseCourselArrow}
    left: -16px;
`

export const CarouselArrowRight = styled.button`
    ${BaseCourselArrow}
    right: -16px;
`

export const CardGrid = styled.div`
    overflow-x: hidden;
    display: grid;
    justify-content: start;
    grid-auto-flow: column;
    grid-template-rows: repeat(2, 1fr);
    gap: 20px;
    padding-bottom: 8px;
`