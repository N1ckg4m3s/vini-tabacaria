import { flexColumn, flexSpaceBetween } from "@/styles/mixins";
import { Theme } from "@/styles/theme";
import styled from "styled-components";

export const CardContainer = styled.li`
  ${flexSpaceBetween}
  background-color: ${Theme.colors.Fundo.cinzaEscuro_36};
  padding: 10px;
  border-radius: 15px;
  width: 100%;
  max-width: 600px;
  min-width: 350px;
  color: ${Theme.colors.Texto.white};
  gap: 5px;
`

export const ItemInformationsContainer = styled.div`
  ${flexSpaceBetween}
  align-items: center;
  width: 100%;
`

export const TitleContainer = styled.div`
  ${flexColumn}
  gap: 10px;
`

export const ItemTitle = styled.strong`
  font-size: 20px;
  inline-size: max-content;
`

export const ItemEspecification = styled.p` font-size: 10px; `

export const ItemQuantity = styled.input`
  outline: none;
  height: 35px;
  background-color: transparent;
  border: 1px solid ${Theme.colors.Borda.white};
  border-radius: 15px;
  padding: 0 10px;
  color: ${Theme.colors.Texto.white};
`

/* ----- [value data] ----- */

export const ValueContainer = styled.div`
  ${flexColumn}
  text-align: end;
  gap: 10px;
  width: max-content;
`

export const SubTotalValue = styled.strong`
  font-size: 15px;
  inline-size: max-content;
  `

export const UnitaryValue = styled.p` font-size: 10px; `