import { GlobalColors } from "@/styles/theme";
import styled from "styled-components";

export const adminContent = styled.main`
    padding: 32px;
    color: ${GlobalColors.Neutral[0]};
`

export const painel = styled.main`
    width: 100%;
    max-width: 900px;
    background: ${GlobalColors.Neutral[800]};
    padding: 32px;
    border-radius: 8px;
    border: 1px solid ${GlobalColors.Border.strong};
    color: ${GlobalColors.Neutral[0]};
`

export const painelTitle = styled.h1`
    margin-bottom: 24px;
    font-size: 24px;
`

export const painelActions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 12px;
`

export const painelButtonSave = styled.button`
    background: ${GlobalColors.Primary.strong};
    color: ${GlobalColors.Text.onPrimary};
    border: none;
    padding: 10px 18px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;

    &:hover{
        background: ${GlobalColors.Primary.base};
    }
`
export const painelButtonCancel = styled.button`
    background: transparent;
    border: 1px solid ${GlobalColors.Border.subtle};
    color: ${GlobalColors.Text.secondary};
    padding: 10px 18px;
    border-radius: 4px;
    cursor: pointer;

    &:hover{
        background: ${GlobalColors.Neutral[700]};
    }
`