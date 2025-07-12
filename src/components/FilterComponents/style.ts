import { buttonReset } from "@/styles/mixins";
import { Theme } from "@/styles/theme";
import { styled, css } from "styled-components";

const ContainerBase = css`
    width: 100%;
    height: fit-content;
    border-radius: 20px;
    padding: 5px;
`

export const FilterTitle = styled.button`
    ${buttonReset}
    width: 100%;
    font-size: 20px;
    text-align: center;
    text-transform:uppercase;
    color: ${Theme.colors.Texto.white};
`

export const FilterSection = styled.div`
    ${ContainerBase};
    color: ${Theme.colors.Texto.white};
    border: 1px solid ${Theme.colors.Borda.white};
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
    color: ${Theme.colors.Texto.white};
`;