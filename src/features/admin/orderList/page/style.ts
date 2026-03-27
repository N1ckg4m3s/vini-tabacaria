import styled, { css } from "styled-components";
import { GlobalColors } from "../../../../styles/theme";
import { flexCenter, flexColumn } from "../../../../styles/mixins";

export const pageContainer = styled.div`
    width: 100%;
    height: 100%;
`

export const tabContainer = styled.div`
    ${flexCenter}
    width: 100%;
    gap: 16px;
    padding-top: 16px;
`

export const tabButton = styled.button<{ actived: boolean }>`
    padding: 10px 16px;
    background-color: ${GlobalColors.Neutral[700]};
    border: 1px solid;
    border-color: ${GlobalColors.Border.strong};
    border-radius: 6px;
    color: ${GlobalColors.Text.secondary};
    cursor: pointer;
    transition: 0.2s;

    ${({ actived }) => actived && css`
        background-color: ${GlobalColors.Neutral[800]};
        color: ${GlobalColors.Text.primary};
        border-color: ${GlobalColors.Border.focus} !important;
    `}

    &:hover{
        border-color: ${GlobalColors.Border.subtle};
    }
`

export const pageTitle = styled.h1`
    color: ${GlobalColors.Text.primary};
    padding: 16px 16px 0px 16px;
    font-size: 28px;
`

export const sectionContainer = styled.section`
    ${flexColumn}
    padding: 16px;
    gap: 8px;
`

export const sectionTittle = styled.h2`
    color: ${GlobalColors.Text.secondary};
    font-size: 18px;
`

export const cardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
`