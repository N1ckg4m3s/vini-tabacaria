import styled, { css } from 'styled-components';
import { Theme } from './theme';

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const flexSpaceBetween = css`
  display: flex;
  justify-content: space-between;
`;

export const flexSpaceAround = css`
  display: flex;
  justify-content: space-around;
`;

export const WhiteRoundedBorder = css`
  border-radius: 20px;
  border: 1px solid ${Theme.colors.Borda.white};
`;

export const ellipsis = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const buttonReset = css`
  outline: none;
  border: 0;
  background-color: transparent;
  cursor: pointer;
`;

export const ContainerPagina = styled.article<{ $Column?: boolean, $Center?: boolean }>`
    display: flex;
    flex-direction: ${({ $Column }) => ($Column ? 'column' : 'row')};
    max-width: 1280px;
    margin: 0 clamp(0px, 50%, calc((100% - 1280px) / 2));
    padding: 0 16px;
    width: 100%;
    gap: 10px;
    height: 100%;
    ${({ $Center }) =>
    $Center && flexCenter
  };
`

export const HorizontalLine = styled.div`
  height: 3px;
  width: 100%;
  background-color: ${Theme.colors.Fundo.cinzaEscuro};
`
export const VerticalLine = styled.div`
  height:auto;
  width: 3px;
  background-color: ${Theme.colors.Fundo.cinzaEscuro};
`