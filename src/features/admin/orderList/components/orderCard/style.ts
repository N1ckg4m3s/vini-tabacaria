import styled from "styled-components";
import { GlobalColors } from "@/styles/theme";
import { flexCenter, flexColumn } from "@/styles/mixins";
import { OrderStatus } from "@/server/order/order.types";

export const orderContainer = styled.div<{ status: OrderStatus }>`
    background-color: ${({ status }) => GlobalColors.statusColor[status].bg};
    border: 1px solid ${({ status }) => GlobalColors.statusColor[status].border};
    color: ${({ status }) => GlobalColors.statusColor[status].text};
    border-radius: 8px;
    padding: 16px;

    ${flexColumn}
    gap: 12px;

    transition: border 0.2s ease, transform 0.1s ease;

    &:hover{
        border-color: ${GlobalColors.Border.subtle};
        transform: translateY(-2px);
    }

    cursor: pointer;
`

export const orderHeader = styled.div`
    ${flexCenter}
    justify-content: space-between;
`

export const orderStatus = styled.span`
    font-size: 13px;
    color: ${GlobalColors.Text.secondary};
`

export const orderTotal = styled.span`
    font-size: 18px;
    font-weight: bold;
    color: ${GlobalColors.Text.focus};
`

export const orderBody = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: ${GlobalColors.Text.muted};
`

export const orderBodySpan = styled.span`
`

export const orderFooter = styled.div`
    font-size: 12px;
    color: ${GlobalColors.Neutral[400]};
`



/*

.order-card.pending {
    background-color: rgba(107, 107, 107, 0.15);
}

.order-card.handling {
    background-color: rgba(15, 98, 254, 0.15);
}

.order-card.completed {
    background-color: rgba(37, 162, 73, 0.15);
}

.order-card.canceled {
    background-color: rgba(218, 30, 40, 0.15);
}
*/