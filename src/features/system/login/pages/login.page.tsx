'use client'

import { LoadingOverlay } from '@/features/_shered/components/loading/component'
import { useLogin } from '../hooks/useLogin'
import * as s from './style'
import { FormEvent } from 'react'

export const LoginPage = () => {
  const { executeLogin, loading } = useLogin()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    executeLogin({
      email: String(formData.get('email')),
      password: String(formData.get('password'))
    })
  }

  return (
    <s.PageContainer>
      <s.LoginContainer>
        <s.LoginTitle>Admin</s.LoginTitle>

        <s.LoginForm onSubmit={handleSubmit}>
          <s.FormField>
            <s.LabelLabel>Email</s.LabelLabel>
            <s.FormInput name='email' type="email" placeholder="admin@dominio.com" />
          </s.FormField>

          <s.FormField>
            <s.LabelLabel>Senha</s.LabelLabel>
            <s.FormInput name='password' type="password" placeholder="••••••••" />
          </s.FormField>

          <s.LoginButton type='submit'>Entrar</s.LoginButton>
        </s.LoginForm>

      </s.LoginContainer>

      {loading && <LoadingOverlay />}
    </s.PageContainer>
  )
}