import styled, { css } from "styled-components";
import { GlobalColors } from "@/styles/theme";
import { flexCenter, flexColumn } from "@/styles/mixins";

export const itemContainer = styled.div`
    position: relative;

    display: grid;
    grid-template-columns: 96px 1fr auto;
    gap: 12px;
    padding: 16px 16px 16px 60px; 

    background-color: ${GlobalColors.Neutral[700]};
    border: 1px solid ${GlobalColors.Border.strong};
    border-radius: 8px;
    
    align-items: center;
`

export const itemAccent = styled.div`
    ${flexCenter}

    position: absolute;
    inset: 0;

    width: 48px;
    background-color: ${GlobalColors.Neutral[800]};

    border-radius: 8px 0 0 8px;
    font-weight: bold;
    color: ${GlobalColors.Text.primary};
`

const ImageStyles = css`
    width: 96px;
    height: 96px;
    border-radius: 12px;
    background: linear-gradient(135deg, #27272a, #18181b);
`

export const image = styled.img` ${ImageStyles} `
export const imageDiv = styled.div` ${ImageStyles} `

export const infosConainer = styled.div`
    ${flexColumn};
    gap: 4px;
`

export const infoName = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: ${GlobalColors.Text.primary};
`
export const infoBrand = styled.div`
    font-size: 14px;
    color: ${GlobalColors.Text.muted};
`
export const infoUnitPrice = styled.div`
    font-size: 14px;
    color: ${GlobalColors.Text.secondary};
`

export const subTotal = styled.div`
    font-size: 16px;
    font-weight: bold;
    color: ${GlobalColors.Text.focus}
`