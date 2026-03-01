import { GlobalColors } from "@/styles/theme"; // to update
import styled from "styled-components";

export const CartPage = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    padding: 24px 24px;
`

export const CartHeader = styled.header`
    color: ${GlobalColors.Text.primary};
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 32px;
`

export const CartTitle = styled.h1`
    margin: 0;
    font-size: 2rem;
`

export const CartItensCount = styled.span`
    color: ${GlobalColors.Text.secondary};
`

export const ContentLayout = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 32px;

    @media (max-width: 900px) {
        grid-template-columns: 1fr;
    }
`