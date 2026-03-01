'use client'

import styled from 'styled-components'
import FooterBarComponent from '@/features/_shered/components/footer/component';
import NavBarComponent from '@/features/_shered/components/navbar/component';
import { useEffect } from 'react';
import { notifyUserUse } from '@/features/system/analytics/services/notifyUserUse';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
`;

export default function ClientLayout({ children }: { children: React.ReactNode }) {

    useEffect(() => notifyUserUse(), [])

    return (
        <LayoutContainer>
            <NavBarComponent />
            <Main>
                {children}
            </Main>
            <FooterBarComponent />
        </LayoutContainer>
    );
}
