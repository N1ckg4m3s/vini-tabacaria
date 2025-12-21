import { buttonReset } from "@/styles/mixins"
import { GlobalColors } from "@/styles/theme"
import styled from "styled-components"

export const QuantityControl = styled.div`
    display: flex;
    height: 100%;
    aspect-ratio: 1 / 1;
    gap: 5px;
`

export const QuantityButton = styled.button`
    ${buttonReset}
    height: 100%;
    aspect-ratio: 1/1;
    background-color: ${GlobalColors.Neutral[700]};
    color: ${GlobalColors.Neutral[0]};

    &:first-child{
        border-radius: 14px 0 0 14px;
    }

    &:last-child{
        border-radius: 0 14px 14px 0;
    }
`

export const QuantityInput = styled.input`
    ${buttonReset}
    min-width: 0;
    text-align: center;
    height: 100%;
    aspect-ratio: 1/1;
    background-color: ${GlobalColors.Neutral[500]};
    color: ${GlobalColors.Neutral[0]};
`