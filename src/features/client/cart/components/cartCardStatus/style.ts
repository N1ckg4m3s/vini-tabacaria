import { buttonReset, flexCenter } from '@/styles/mixins'
import { GlobalColors } from '@/styles/theme'
import styled, { css } from 'styled-components'

const OverLay = css`
    position: absolute;
    inset: 0;
    z-index: 5;

    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(2px);

    border-radius: 16px;
    padding: 16px;
`

export const StatusContainer = styled.div`
    ${OverLay}
    ${flexCenter}

    flex-direction: column;
    gap: 12px;
    text-align: center;
    margin: auto;
`

export const Title = styled.strong`
    font-size: 1rem;
`

export const Text = styled.p`
    font-size: 0.85rem;
`

export const Strong = styled.strong`
    color: ${GlobalColors.Text.muted};
`

export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`

export const Arrow = styled.span`
    opacity: 0.8;
`

export const OldPrice = styled.span`
    text-decoration: line-through;
    opacity: 0.7;
`

export const NewPrice = styled.span`
    font-weight: 600;
`

const baseButton = css`
    padding: 6px 12px;
    border: 2px solid;
    border-radius: 10px;
    font-weight: bold;
    cursor: pointer;

    transition: filter 0.15s ease;
`

export const ButtonAccept = styled.button`
    ${buttonReset}
    ${baseButton}

    background-color: ${GlobalColors.Feedback.success.strong};
    border-color: ${GlobalColors.Feedback.success.strong};

    color: white;

    &:hover {
        filter: brightness(1.1);
    }
`

export const ButtonRemove = styled.button`
    ${buttonReset}
    ${baseButton}

    background-color: ${GlobalColors.Feedback.error.soft};
    border-color: ${GlobalColors.Feedback.error.strong};

    color: ${GlobalColors.Feedback.error.strong};

    &:hover {
        filter: brightness(1.1);
    }
`