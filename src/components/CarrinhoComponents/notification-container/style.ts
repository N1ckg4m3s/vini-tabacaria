import { flexColumn } from "@/styles/mixins";
import { Theme } from "@/styles/theme";
import styled from "styled-components";

type tipoAviso = 'Warning' | 'Sucess' | 'Error' | 'Observation';

export const NotificationContainer = styled.div<{ $TipoAviso: tipoAviso }>`
  ${flexColumn};
  width: 100%;
  max-width: 450px;
  background-color: ${({ $TipoAviso }) => Theme.colors.Fundo.notificationColor[$TipoAviso]};
  border-left: 3px solid ${({ $TipoAviso }) => Theme.colors.Borda.notificationColor[$TipoAviso]};
  gap: 8px;

  padding: 10px;

`

export const TitleNotification = styled.strong`
  text-transform: uppercase;
`

export const DescriptionNotification = styled.div`
`
