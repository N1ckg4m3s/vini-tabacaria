import styled from "styled-components";
import { GlobalColors } from "../../../../../styles/theme";
import { flexCenter } from "../../../../../styles/mixins";

export const TotalContainer = styled.div`
    ${flexCenter}
    justify-content: space-between;

    margin-top: 20px;
    padding: 16px;
    border-radius: 8px;
    background-color: ${GlobalColors.Neutral[800]};
    border: 1px solid ${GlobalColors.Border.strong};

    font-size: 18px;
`

export const Span = styled.span`
    color: ${GlobalColors.Text.primary};
`

export const TotalValue = styled.strong`
    color: ${GlobalColors.Text.focus};
    font-size: 20px;
`