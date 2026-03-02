import { flexColumn } from "@/styles/mixins";
import { GlobalColors } from "@/styles/theme";
import styled, { css } from "styled-components";

export const section = styled.section`
    margin-bottom: 32px;
    padding: 20px;
    background: ${GlobalColors.Neutral[700]};
    border-radius: 6px;
    border: 1px solid ${GlobalColors.Border.strong};
`

export const sectionTitle = styled.h2`
    margin-bottom: 16px;
    font-size: 16px;
    color: ${GlobalColors.Neutral[200]};
`

export const grid2 = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
`

export const field = styled.div`${flexColumn}`

export const fieldLabel = styled.div`
    font-size: 12px;
    margin-bottom: 6px;
    color: ${GlobalColors.Text.muted};
`

const inputStyle = css`
    padding: 10px;
    background: ${GlobalColors.Neutral[950]};
    border: 1px solid ${GlobalColors.Border.subtle};
    border-radius: 4px;
    color:${GlobalColors.Text.primary};
    transition: border 0.2s;

    &:focus{
        outline: none;
        border-color: ${GlobalColors.Border.focus};
    }
`

export const fieldInput = styled.input`${inputStyle}`
export const fieldSelect = styled.select`${inputStyle}`

export const checkboxGroup = styled.div`
    ${inputStyle}
    display: flex;
    justify-content: space-around;
`;

export const checkboxItem = styled.label`
    ${flexColumn}
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: ${GlobalColors.Text.primary};
    cursor: pointer;

    position:relative;

    border-radius: 20px;
    padding: 1px 5px;

    &:has(input:checked){
        background-color: ${GlobalColors.Primary.strong};
    }
`;

export const checkboxInput = styled.input.attrs({ type: 'checkbox' })`
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    accent-color: ${GlobalColors.Primary.base};
    cursor: pointer;
`;
