import styled, { css, keyframes } from 'styled-components';
import { GlobalColors } from "@/styles/theme"; // to update

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const flexRow = css`
  display: flex;
  flex-direction: row;
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
  border: 1px solid ${GlobalColors.Neutral[0]};
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
  background-color: ${GlobalColors.Border.strong};
`
export const VerticalLine = styled.div`
  height:auto;
  width: 3px;
  background-color: ${GlobalColors.Border.strong};
`

// SKELETON ANIMATION //

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

export const skeletonEffect = css`
  position: relative;
  overflow: hidden;
  background: ${GlobalColors.Neutral[700]};

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.08),
      transparent
    );
    animation: ${shimmer} 1.2s infinite;
  }
`;