import { GlobalColors } from "@/styles/theme"; // to update
import styled from "styled-components";

export const CartCotaniner = styled.article`
    color: ${GlobalColors.Text.primary};
    display: flex;
    gap: 16px;
    background: ${GlobalColors.Neutral[600]};
    border: 1px solid ${GlobalColors.Border.subtle};
    border-radius: 16px;
    padding: 16px;
`

export const CartImage = styled.div`
    width: 96px;
    height: 96px;
    border-radius: 12px;
    background: linear-gradient(135deg, #27272a, #18181b);
`

export const CartInformations = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

export const CartTitle = styled.h3`
    margin: 0;
    font-size: 1rem;
`

export const CartMarca = styled.span`
    font-size: 0.85rem;
    color: ${GlobalColors.Text.secondary};
    margin-bottom: 12px;
`

export const Actions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;

    max-height: 28px;
`

export const Price = styled.span`
    font-weight: 600;
`

export const RemoveButtton = styled.button`
    margin-top: 8px;
    align-self: flex-start;
    background: none;
    border: none;
    color: #ef4444;
    font-size: 0.8rem;
    cursor: pointer;
`