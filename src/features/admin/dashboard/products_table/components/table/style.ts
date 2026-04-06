import styled, { css } from "styled-components";
import { GlobalColors } from "@/styles/theme";

export const table = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-radius: 12px;
    overflow: hidden;
    background-color: ${GlobalColors.Neutral[700]};
    border: 1px solid ${GlobalColors.Border.strong};
    `

export const tableHead = styled.thead`
    background-color: ${GlobalColors.Neutral[850]};
`

export const tableBody = styled.tbody``

const baseTD_TR = css`
    padding: 12px;
    text-align: left;
    font-size: 14px;
`

export const tableData = styled.td`
    ${baseTD_TR}
    color: ${GlobalColors.Text.secondary};
`

export const tableRow = styled.tr`
    ${baseTD_TR}
    color: ${GlobalColors.Text.primary};
    border-top: 1px solid ${GlobalColors.Border.strong};
`