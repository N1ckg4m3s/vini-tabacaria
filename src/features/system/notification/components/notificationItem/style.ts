import styled, { css } from 'styled-components';
import { notification } from '../../types/notification.type';
import { GlobalColors } from '@/styles/theme';

type notifiType = notification['type']

export const NotificationContainer = styled.div<{ variety?: notifiType }>`
  width: 100%;
  border-left: 4px solid;
  border-radius: 6px;
  overflow: hidden;

  background: #1f1f1f;
  box-shadow: 0 8px 24px rgba(0,0,0,.4);

  transition: height .25s ease, opacity .25s ease;

  ${({ variety }) => {
    switch (variety) {
      case 'Error':
        return css`
          --accent: ${GlobalColors.Feedback.error.strong};
          --accent-soft: ${GlobalColors.Feedback.error.soft};
        `
      case 'Success':
        return css`
          --accent: ${GlobalColors.Feedback.success.strong};
          --accent-soft: ${GlobalColors.Feedback.success.soft};
        `
      case 'Warning':
        return css`
          --accent: ${GlobalColors.Feedback.warning.strong};
          --accent-soft: ${GlobalColors.Feedback.warning.soft};
        `
    }
  }}

  border-left-color: var(--accent);
  background: var(--accent-soft);
`;

export const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 8px 12px;
  font-weight: 600;
  font-size: 14px;

  background: color-mix(in srgb, var(--accent) 50%, transparent);
`

export const NotificationBody = styled.div`
  padding: 10px 12px;
  font-size: 13px;
  line-height: 1.4;
`