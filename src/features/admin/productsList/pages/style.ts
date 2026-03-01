import { GlobalColors } from "@/styles/theme";
import styled, { css } from "styled-components";

export const adminContent = styled.main`
    padding: 32px;
    color: ${GlobalColors.Neutral[0]};
`

export const adminHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
`

export const headerActions = styled.div``

export const headerinput = styled.input`
    padding: 10px 14px;
    width: 320px;
    border-radius: 6px;
    border: none;
    background: ${GlobalColors.Neutral[800]};
    border: 1px solid ${GlobalColors.Border.strong};
    color: ${GlobalColors.Neutral[0]};
`

/* ========== [TABELAS] ========== */
export const tableWarper = styled.section`
    margin: 20px;
    background: ${GlobalColors.Neutral[800]};
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid ${GlobalColors.Neutral[600]};
`

export const table = styled.table`
    width: 100%;
    border-collapse: collapse;
    color: ${GlobalColors.Neutral[0]};
`

export const thead = styled.thead`
    background: ${GlobalColors.Neutral[850]};
`

export const th = styled.th`
    padding: 14px 16px;
    text-align: left;
`