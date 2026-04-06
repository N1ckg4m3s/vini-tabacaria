import styled from 'styled-components';
import { flexSpaceBetween } from '@/styles/mixins';
import { GlobalColors } from "@/styles/theme"; // to update
import Link from 'next/link';
import { flexColumn } from '../../../../styles/mixins';

export const FooterContainer = styled.footer`
    margin-top: 10px;
    display: grid;
    padding: 20px clamp(10px, 5vw, 80px);
    min-height: 80px;
    background-color: ${GlobalColors.Neutral[600]};
    grid-template-columns: 1fr auto 1fr;
    grid-template-areas: "copyright logo icons";
    align-items: center;
    gap: 10px;

    @media screen and (max-width: 600px) {
        grid-template-columns: auto auto;
        grid-template-areas:
            "logo logo"
            "copyright icons";
    }

    @media screen and (max-width: 480px) {
        grid-template-columns: auto;
        grid-template-areas:
            "logo"
            "icons"
            "copyright";
    }
`;

export const FooterLogo = styled.div`
    grid-area: logo;
    justify-self: center;
`;

export const FooterCopyrightText = styled.p`
    ${flexColumn}

    font-size: 0.85rem;
    color: ${GlobalColors.Text.secondary};
    grid-area: copyright;
    justify-self: start;

    @media screen and (max-width: 480px){
        justify-self: center;
    }
`;

export const IconsContainer = styled.div`
    ${flexSpaceBetween};
    grid-area: icons;
    justify-self: end;
    gap: 12px;
    @media screen and (max-width: 480px){
        justify-self: center;
    }
`;

export const AdminLink = styled(Link)`
    margin-left: 6px;
    text-decoration: none;
    color: inherit;
    opacity: 0.6;
    transition: opacity 0.2s ease;
    font-weight: bold;

    &:hover {
        opacity: 1;
        text-decoration: underline;
    }
`;