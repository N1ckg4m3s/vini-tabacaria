import { flexCenter } from '@/styles/mixins';
import styled from 'styled-components';

export const StatusContainer = styled.div`
    ${flexCenter}
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(2px);
    border-radius: 16px;
    padding: 16px;
`