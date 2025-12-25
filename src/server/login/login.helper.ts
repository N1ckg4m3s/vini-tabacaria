import { AuthError } from '@/http/error/erros.handle'
import { loginCredential } from '@/shered/shered.types'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!
const tempoDeSessao: number = 60 * 60 * 6 // 6 horas em sec

type generateTokenParams = Pick<loginCredential, "email"> & {
    role: 'admin' | 'user' // Só tem admin, mas deixa para futuro..
}

type tokenPayload = generateTokenParams & {
    iat: number,
    exp: number
}

export const generateToken = (params: generateTokenParams): string => {
    const { email, role } = params

    const token = jwt.sign(
        { email, role },
        JWT_SECRET,
        { expiresIn: tempoDeSessao }
    )
    return token
}

export const veryfyToken = (token: string): tokenPayload => {
    return jwt.verify(token, JWT_SECRET) as tokenPayload
}