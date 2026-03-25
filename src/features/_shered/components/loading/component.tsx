'use client'

import * as s from './style'

export const LoadingOverlay: React.FC = () => (
    <s.Overlay>
        <s.Spinner />
        <s.Text>Carregando....</s.Text>
    </s.Overlay>
);