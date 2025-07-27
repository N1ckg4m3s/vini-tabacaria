import { Theme } from '@/styles/theme';
import styled from 'styled-components';

export const ContainerRegistrarProduto = styled.div`
    max-width: 600px;
    margin: 40px auto;
    background: ${Theme.colors.Fundo.cinzaEscuro};
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 0 12px hsla(0, 0%, 0%, 0.08);
    color: ${Theme.colors.Texto.white};
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const FormRow = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 0.95rem;
    font-weight: 500;
`

export const FormRowInput = styled.input`
    outline: none;
    padding: 10px;
    margin-top: 6px;
    border-radius: 8px;
    font-size: 1rem;
    background-color: transparent;
    color: ${Theme.colors.Texto.white};
    border: 2px solid ${Theme.colors.Borda.white};
`;

export const FormLabel = styled.span`
    display: flex;
    flex-direction: column;
    font-size: 0.95rem;
    font-weight: 500;
`

export const Select = styled.select`
    padding: 10px;
    margin-top: 6px;
    border: 2px solid ${Theme.colors.Borda.white};
    color: ${Theme.colors.Texto.white};
    background-color: ${Theme.colors.Fundo.cinzaEscuro};;
    border-radius: 8px;
    font-size: 1rem;
`;

export const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
`;

export const TextArea = styled.textarea`
    padding: 10px;
    margin-top: 6px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    resize: vertical;
    min-height: 80px;
`;

export const Button = styled.button`
    background: #1e90ff;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: 'background' 0.3s ease;

    &:hover {
        background: #1c80e3;
    }
`;