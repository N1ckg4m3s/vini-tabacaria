import { buttonReset, flexColumn } from "@/styles/mixins";
import { GlobalColors } from "@/styles/theme";
import { styled, css } from "styled-components";

const ContainerBase = css`
    width: 100%;
    height: fit-content;
    border-radius: 20px;
    padding: 5px;
`

export const FilterAnimation = styled.div`
    overflow: hidden;
    width: fit-content;
    height: fit-content;
`

export const FilterContainer = styled.form<{ $oppend: boolean }>`
    ${ContainerBase};
    ${flexColumn};
    max-width: 250px;
    background-color: ${GlobalColors.Neutral[600]};
    gap: 10px;

    @media screen and (width<600px){
        position: absolute;
        z-index: 2;
        transition: margin 0.5s;
        margin-left: ${({ $oppend }) => $oppend ? 0 : -100}%;
        box-shadow: 15px 5px 10px 10px ${GlobalColors.Neutral[900]}CC;
    }
`

export const FilterTitle = styled.button`
    ${buttonReset}
    width: 100%;
    font-size: 20px;
    text-align: center;
    text-transform:uppercase;
    color: ${GlobalColors.Text.primary};
`

export const FilterButtonSubmit = styled.button`
    ${buttonReset};
    ${ContainerBase};
    width: 100%;
    font-size: 20px;
    text-align: center;
    text-transform: uppercase;
    color: ${GlobalColors.Text.primary};
    border: 1px solid ${GlobalColors.Neutral[0]};
`

/* Filters sections */

export const FilterSection = styled.div`
    ${ContainerBase};
    color: ${GlobalColors.Text.primary};
    border: 1px solid ${GlobalColors.Neutral[0]};
    padding: 5px 20px 10px 20px;
    gap: 5px;
`

export const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 8px;
`;

export const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  width: 16px;
  height: 16px;
  accent-color: #007bff; /* cor do check */
`;

export const LabelText = styled.span`
    font-size: 14px;
    color: ${GlobalColors.Text.primary};
`;