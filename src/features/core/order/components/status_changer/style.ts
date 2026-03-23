import styled from "styled-components";
import { OrderStatus } from "../../../../../server/order/order.types";
import { buttonReset, flexCenter } from "../../../../../styles/mixins";
import { GlobalColors } from "../../../../../styles/theme";

export const statusContainer = styled.div`
    ${flexCenter}
    justify-content: space-around;
    background-color: ${GlobalColors.Neutral[800]};
    padding: 16px;
    border-radius: 8px;
    border: 1px solid ${GlobalColors.Border.strong};
    margin-bottom: 20px;
`

export const statusButton = styled.button<{ status: OrderStatus }>`
    ${buttonReset}
    
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: bold;

    background-color: ${({ status }) => GlobalColors.statusColor[status].bg};
    border: 1px solid  ${({ status }) => GlobalColors.statusColor[status].border};
    color:  ${({ status }) => GlobalColors.statusColor[status].text};

    transition: all 0.2s ease;

    &:hover {
        filter: brightness(1.1);
    }

    &:disabled{
        opacity: 0.5;
        cursor: not-allowed;
        filter: grayscale(40%);
    }
`