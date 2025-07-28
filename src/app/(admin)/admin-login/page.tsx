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
    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoadingVisible(true);

        // Verifica se os campos de email e senha estão preenchidos
        if (!emailRef.current || !passwordRef.current) {
            setErrorVisible('Algo de errado aconteceu resete.');
            return;
        }

        // Coleta os valores dos campos de email e senha
        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    acesso: email,
                    senha: password,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                setErrorVisible(data.error || 'Erro ao fazer login')
                setLoadingVisible(false);
                return
            }

            // salva token no localStorage
            localStorage.setItem('expiraEm', data.expiraEm)

            // redireciona para dashboard
            router.push('/admin-product-list')

        } catch (error) {
            setLoadingVisible(false);
            setErrorVisible('Invalid credentials. Please try again.');
        }
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