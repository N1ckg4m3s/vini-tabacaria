'use client'

import styled from 'styled-components'
import { DrowerBarComponent } from '@/features/_shered/components/DrowerBar/component';

const LayoutContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: row;
`;

const Main = styled.main`
    margin-left: calc(70px);
    flex: 1;
`;

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <LayoutContainer>
            <DrowerBarComponent />
            <Main>
                {children}
            </Main>
        </LayoutContainer>
    );
}
