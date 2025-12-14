'use client'

import styled from 'styled-components'
import { ReduxProvider } from '@/store/redux-provider'
import FooterBarComponent from '@/features/_shered/components/footer/component';
import NavBarComponent from '@/features/_shered/components/navbar/component';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ReduxProvider>
            <LayoutContainer>
                <NavBarComponent />
                <Main>
                    {children}
                </Main>
                <FooterBarComponent />
            </LayoutContainer>
        </ReduxProvider>
    );
}
