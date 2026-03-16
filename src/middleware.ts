import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET!

const secret = new TextEncoder().encode(JWT_SECRET)

/**
 * Função para validar se a rota é de Admin
 * 
 * @param pathname Rota a ser validada
 * 
 * @returns {boolean} Retorna true se a rota é admin, caso publica false
 */
const isAdminRoute = (pathname: string): boolean => pathname.startsWith('/api/admin') || pathname.startsWith('/admin')

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
 * Middleware para validar o token JWT e controlar o acesso às rotas
 * 
 * @param req Requisição do Next.js
 * 
 * @returns {NextResponse} Retorna a resposta do Next.js
 */
export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl

    // Validar se a rota é pública ou se é uma rota de admin
    if (!isAdminRoute(pathname)) return NextResponse.next();

    const token = obterToken(req);

    try {
        if (!token) throw new Error('Token não encontrado');

        await jwtVerify(token, secret);

        return NextResponse.next();
    } catch (_) {
        return NextResponse.redirect(new URL('/login', req.nextUrl.origin))
    }
}

export const config = {
    matcher: ['/((?!_next|favicon.ico).*)'],
}

/*
    foi instalado 'jose' para validação do token
    o middleware roda em 'Edge Runtime' não podendo acessar o crypto navido do NEXT
*/