'use client'

import styled from 'styled-components'
import { useEffect } from 'react';
import NavBarComponent from '../../features/_shered/components/navbar/component';
import FooterBarComponent from '../../features/_shered/components/footer/component';
import { notifyUserUse } from '../../features/system/analytics/services/notifyUserUse';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
    display: flex;
    justify-content: center;
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
