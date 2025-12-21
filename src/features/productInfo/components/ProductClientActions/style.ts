import { buttonReset, flexCenter } from "@/styles/mixins";
import { GlobalColors } from "@/styles/theme";
import styled, { css } from "styled-components";

const base = css`
    margin-top: 40px;
    height: 50px;
    font-size: 1rem;
    font-weight: 600;
`

export const BotaoCompra = styled.button`
    ${buttonReset}
    ${base}
    background-color: ${GlobalColors.Primary.base};
    color: ${GlobalColors.Text.primary};
    border-radius: 14px;

    &:hover {
        filter: brightness(1.05);
    }
`

export const QuantityContainer = styled.div`
    ${base};
    ${flexCenter}
`