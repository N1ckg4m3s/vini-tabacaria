import { NextRequest, NextResponse } from 'next/server'
import { LoginService } from '../../../../server/login/login.service'
import { canAttemptLogin, clearLoginAttempts, registerLoginFailure } from '../../../../http/rate-limit/login-rate-limit'

export const POST = async (req: NextRequest) => {
    const { email, password } = await req.json()

    const forwardedFor = req.headers.get('x-forwarded-for')
    const ip = forwardedFor?.split(',')[0]?.trim() ?? 'unknown'

    if (!canAttemptLogin(ip)) {
        return NextResponse.json(
            { message: 'Muitas tentativas, tente mais tarde' },
            { status: 429 }
        )
    }

    try {
        const service = new LoginService()
        const token = service.executeLogin({ email, password })

        clearLoginAttempts(ip)

        const response = NextResponse.json({ ok: true })

        response.cookies.set('authToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24,
        })

        return response
    } catch (_) {
        registerLoginFailure(ip)

        return NextResponse.json(
            { message: 'Credenciais inválidas' },
            { status: 401 }
        )
    }
}
