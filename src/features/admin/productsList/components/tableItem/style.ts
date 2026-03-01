import { GlobalColors } from "@/styles/theme";
import styled from "styled-components";

export const trBody = styled.tr`
    border-top: 1px solid ${GlobalColors.Neutral[600]};
    
    &:hover{
        background:${GlobalColors.Neutral[700]};
    }
`

export const td = styled.td`
    padding: 14px 16px;
    text-align: left;
`

export const tdActionButton = styled.button`
    padding: 6px 10px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    color: ${GlobalColors.Neutral[0]};
    font-size: 12px;
    background: ${GlobalColors.Primary.strong};
    
    &:hover{
        background: ${GlobalColors.Primary.base};
    }
`