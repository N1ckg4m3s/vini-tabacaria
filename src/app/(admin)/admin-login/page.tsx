'use client';
import { useRouter } from 'next/navigation';
import * as s from './style';
import { FormEvent, useRef, useState } from 'react';

/**
 * Esta página exibe um formulario de loginpara adms, :
 * - Campos para inserir o nome de usuário e senha
 * - Botão para enviar o formulário
 * Mensagens de erro e sucesso que podem ser exibidas com base no estado do login
 * 
 * @component
 * @returns {JSX.Element} O componente de página de login do admin.
 */
const LoginPage = () => {
    /** Referência ao campo de input de busca para evitar renderização completa do componente */
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    /* Roteador para mudar de tela */
    const router = useRouter();

    /** Estado que controla a visibilidade da mensagem de erro */
    const [errorVisible, setErrorVisible] = useState<string>('');
    const [loadingVisible, setLoadingVisible] = useState(false);

    /**
        * Manipula o envio do formulário de login.
        * Evita recarregamento da página, coleta o valor do input e reseta o campo.
        *
        * @param event - Evento de envio do formulário (submit).
    */
    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Verifica se os campos de email e senha estão preenchidos
        if (!emailRef.current || !passwordRef.current) {
            setErrorVisible('Algo de errado aconteceu resete.');
            return;
        }

        // Coleta os valores dos campos de email e senha
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();

        // teste mock
        if (email === 'admin' && password === 'admin') {
            setLoadingVisible(true);
            router.push('/admin-product-list');
            setTimeout(() => {
                setLoadingVisible(false);
            }, 2000);
        } else {
            setErrorVisible('Invalid credentials. Please try again.');
        }
        console.log('Email:', email);
        console.log('Password:', password);
        return;
    };

    return (
        <s.Container>
            <s.FormContainer>
                <s.Title>Admin Login</s.Title>
                <form onSubmit={handleFormSubmit}>
                    <s.Input type="text" placeholder="Username" ref={emailRef} />
                    <s.Input type="password" placeholder="Password" ref={passwordRef} />
                    <s.Button type="submit">Login</s.Button>
                </form>
                {
                    (errorVisible && errorVisible !== '') &&
                    <s.ErrorMessage>{errorVisible}</s.ErrorMessage>
                }
            </s.FormContainer>
            {loadingVisible && (
                <s.ContainerLoading>
                    <s.LoadingSpinner />
                </s.ContainerLoading>
            )}
        </s.Container>
    );
}

export default LoginPage;