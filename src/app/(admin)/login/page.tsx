'use client';
import * as s from './style';

const LoginPage = () => {
    return (
        <s.Container>
            <s.FormContainer>
                <s.Title>Admin Login</s.Title>
                <form>
                    <s.Input type="text" placeholder="Username" />
                    <s.Input type="password" placeholder="Password" />
                    <s.Button type="submit">Login</s.Button>
                </form>
                <s.ErrorMessage $visible={false}>Error message here</s.ErrorMessage>
                <s.SuccessMessage $visible={false}>Success message here</s.SuccessMessage>
            </s.FormContainer>
        </s.Container>
    );
}

export default LoginPage;