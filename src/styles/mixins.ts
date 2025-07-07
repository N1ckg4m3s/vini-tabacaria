import { css } from 'styled-components';
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
