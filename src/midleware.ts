import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET!

const secret = new TextEncoder().encode(JWT_SECRET)

const rotasPublicas = ['/admin-login']

/**
 * Função para validar se a rota é pública ou se é uma rota de admin
 * 
 * @param rota Rota a ser validada
 * 
 * @returns {boolean} Retorna true se a rota é pública ou de admin, caso contrário false
 */
const validarAcesso = (rota: string): boolean => {
    // Verifica se a rota é pública
    if (rotasPublicas.includes(rota)) return true;

    // Verifica se a rota começa com /admin_
    if (rota.startsWith('/admin_')) return true;

    // Verifica se a rota começa com /api/admin_
    if (rota.startsWith('/api/admin_')) return true;

    return false
}

/**
 * Função para obter o token do cookie
 * 
 * @param req Requisição do Next.js
 * 
 * @returns {string | null} Retorna o token se encontrado, caso contrário null
 */
const obterToken = (req: NextRequest): string | null => {
    const token = req.cookies.get('authToken')?.value
    return token || null
}

/**
 * Função para redirecionar o usuário para a página de login
 * 
 * @param req Requisição do Next.js
 */
const redirecionarParaLogin = (req: NextRequest) => {
    NextResponse.redirect(new URL('/login', req.url));
    return;
}

/**
 * Middleware para validar o token JWT e controlar o acesso às rotas
 * 
 * @param req Requisição do Next.js
 * 
 * @returns {NextResponse} Retorna a resposta do Next.js
 */
export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    // Validar se a rota é pública ou se é uma rota de admin
    if (validarAcesso(pathname)) {
        return NextResponse.next()
    }

    const token = obterToken(req);

    try {
        // Verifica se o token é válido
        if (!token) {
            throw new Error('Token não encontrado')
        }
        jwtVerify(token, secret);

        return NextResponse.next();
    } catch (error) {
        console.error('Erro ao obter o token:', error)
        redirecionarParaLogin(req)
        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/((?!_next|favicon.ico).*)'],
}

/*
    foi instalado 'jose' para validação do token
    o middleware roda em 'Edge Runtime' não podendo acessar o crypto navido do NEXT
*/