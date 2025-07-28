import { NextResponse } from 'next/server'
import validateEmail from '@/controller/utilits'
import { generateToken } from '@/controller/auth'

const JWT_SECRET = process.env.JWT_SECRET!

interface LoginRequest {
    acesso: string
    senha: string
}

const acessoCorreto = 'admim@admim.com'
const senhaCorreta = 'admim123'

export async function POST(request: Request) {
    try {
        const { acesso, senha }: LoginRequest = await request.json()

        const acessoNormalizado = (acesso ?? '').toLowerCase()

        if (!validateEmail(acessoNormalizado)) throw new Error('Formato de email inválido')
        if (acessoNormalizado !== acessoCorreto) throw new Error('Email incorreto')
        if (senha !== senhaCorreta) throw new Error('Senha incorreta')

        const tempoDeSessao: number = 60 * 60 * 24 // 1 dia
        const dataFinalDaSessao: Date = new Date(Date.now() + tempoDeSessao * 1000)

        const token: string = generateToken(
            acessoNormalizado,
            'admin',
        )

        // Gera a resposta para poder efetuar o login
        const response = NextResponse.json({
            message: 'Login bem-sucedido',
            expiraEm: dataFinalDaSessao.toISOString(),
        })

        // Definindo token no 'HttpOnly'
        response.cookies.set('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development',
            sameSite: 'lax',
            path: '/',
            maxAge: tempoDeSessao,
        })

        return response;

    } catch (error: unknown) {
        console.error('Erro no login:', error)

        const message = error instanceof Error ? error.message : 'Erro desconhecido'
        return NextResponse.json({ error: message }, { status: 401 })
    }
}