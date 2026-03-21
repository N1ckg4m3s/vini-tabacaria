import styled from "styled-components";
import { GlobalColors } from "../../../../../styles/theme";
import { flexCenter } from "../../../../../styles/mixins";

export const orderHeader = styled.div`
    ${flexCenter}
    justify-content: space-between;
    background-color: ${GlobalColors.Neutral[800]};
    padding: 16px;
    border-radius: 8px;
    border: 1px solid ${GlobalColors.Border.strong};
    margin-bottom: 20px;
`

export const orderId = styled.div`
    font-size: 18px;
    font-weight: bold;
    color: ${GlobalColors.Text.primary};
`

export const orderStatus = styled.div`
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 14px;
    background-color: ${GlobalColors.Neutral[550]};
    color: ${GlobalColors.Text.secondary};
`
