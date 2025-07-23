import { flexCenter } from '@/styles/mixins';
import styled from 'styled-components';

export const Container = styled.div`
  ${flexCenter}
  height: 100%;
`;

export const FormContainer = styled.div`
    width: 100%;
    max-width: 400px;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
`;

export const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

export const ErrorMessage = styled.p<{ $visible: boolean }>`
    color: red;
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
    visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
    transition: visibility 0.3s ease;
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    transition: opacity 0.3s ease;
`

export const SuccessMessage = styled.p<{ $visible: boolean }>`
    color: green;
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
    visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
    transition: visibility 0.3s ease;
    opacity: ${({ $visible }) => ($visible ? 1 : 0)};
    transition: opacity 0.3s ease;
`
export const Link = styled.a`
    display: block;
    text-align: center;
    margin-top: 15px;
    color: #007bff;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

export const LinkContainer = styled.div`
    text-align: center;
    margin-top: 15px;
`;
