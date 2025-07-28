const JWT_SECRET = process.env.JWT_SECRET!
import jwt from 'jsonwebtoken'
const tempoDeSessao: number = 60 * 60 * 24 // 1 dia

export const generateToken = (acesso: string, role: string): string => {
    // Gera o token JWT com o acesso e a role do usuário
    const token = jwt.sign(
        { acesso, role: role },
        JWT_SECRET,
        { expiresIn: tempoDeSessao }
    )

    return token
}

export const validateToken = (token: string): { acesso: string, role: string } => {
    try {
        // Verifica e decodifica o token JWT
        const decoded = jwt.verify(token, JWT_SECRET) as { acesso: string, role: string }
        return decoded
    } catch (error) {
        console.error('Erro ao validar o token:', error)
        throw new Error('Token inválido ou expirado')
    }
}