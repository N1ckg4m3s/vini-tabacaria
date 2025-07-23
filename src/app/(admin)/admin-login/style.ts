import { buttonReset, flexCenter, WhiteRoundedBorder } from '@/styles/mixins';
import { Theme } from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  ${flexCenter}
  height: 100%;
`;

export const FormContainer = styled.div`
    width: 100%;
    max-width: 400px;
    padding: 20px;
    background-color: ${Theme.colors.Fundo.cinzaEscuro};
    border-radius: 8px;
    border: 1px solid ${Theme.colors.Borda.white};
`;

export const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: ${Theme.colors.Texto.white};
    text-transform: uppercase;
`;

export const Input = styled.input`
    ${WhiteRoundedBorder}
    background-color: transparent;
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 4px;
    outline: none;
    color: ${Theme.colors.Texto.white};
`;

export const Button = styled.button`
    ${buttonReset}
    width: 100%;
    padding: 10px;
    background-color: ${Theme.colors.Fundo.VerdeClaro};
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
        background-color: ${Theme.colors.Fundo.VerdeEscuro};
    }
`;

export const ErrorMessage = styled.p`
    color: red;
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
    transition: visibility 0.3s ease;
    transition: opacity 0.3s ease;
`

export const ContainerLoading = styled.div`
    ${flexCenter}
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
`;

export const LoadingSpinner = styled.div`
    border: 4px solid ${Theme.colors.Borda.white};
    border-top: 4px solid ${Theme.colors.Fundo.VerdeClaro};
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
