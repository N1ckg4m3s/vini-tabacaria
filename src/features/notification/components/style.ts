import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  bottom: 8px;
  right: 8px;
  width: 320px;
  z-index: 9999;
  `;

export const Stack = styled.div`
  display: flex;
  flex-direction: column-reverse;
  pointer-events: auto;

  &:not(:hover) > *:not(:first-child) {
    height: 10px;
    opacity: .5;
  }

  &:hover > * {
    height: auto;
    opacity: 1;
    margin-top: 5px;
  }
`;
