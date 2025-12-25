import { LoadingOverlay } from '@/features/_shered/components/loading/component'
import { useLogin } from '../hooks/useLogin'
import * as s from './style'

export const LoginPage = () => {
  const { executeLogin, loading } = useLogin()

  return (
    <s.PageContainer>
      <s.LoginContainer>
        <s.LoginTitle>Admin</s.LoginTitle>

        <s.LoginForm>
          <s.FormField>
            <s.LabelLabel>Email</s.LabelLabel>
            <s.FormInput type="email" placeholder="admin@dominio.com" />
          </s.FormField>

          <s.FormField>
            <s.LabelLabel>Senha</s.LabelLabel>
            <s.FormInput type="password" placeholder="••••••••" />
          </s.FormField>

          <s.LoginButton>Entrar</s.LoginButton>
        </s.LoginForm>

      </s.LoginContainer>

      {loading && <LoadingOverlay />}
    </s.PageContainer>
  )
}