import { AuthError, BadRequestError, InternalError } from "@/http/error/erros.handle"
import { loginCredential } from "@/shered/shered.types"
import { validateEmail } from "@/shered/validators/email.validator"
import { generateToken, veryfyToken } from "./login.helper"

export class LoginService {
    verifyCredentials = (token: string) => {
        if (!token) throw new AuthError("Token ausente");

        let payload;

        try {
            payload = veryfyToken(token);
        } catch {
            throw new AuthError("Credenciais inválidas");
        }

        if (payload.role !== 'admin')
            throw new AuthError("Permissão insuficiente");

        return payload;
    }

    executeLogin = (params: loginCredential) => {
        const { email, password }: loginCredential = params

        if (!email.trim() || !password.trim()) throw new AuthError("Credenciais invalidas");

        validateEmail(email) // gera erro ao invalido

        const emailEnv: string | undefined = process.env.ADMIN_EMAIL
        const passwordEnv: string | undefined = process.env.ADMIN_PASSWORD

        if (!emailEnv || !passwordEnv) throw new InternalError("Credenciais não adicionadas");

        if ((email != emailEnv) || (password != passwordEnv)) throw new BadRequestError("Credenciais invalidas");

        const token = generateToken({
            email,
            role: 'admin'
        })

        return token
    }
}