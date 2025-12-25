import { AuthError } from "@/http/error/erros.handle";

export const validateEmail = (email: string) => {
    const emailTrim = email.trim()

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!regex.test(emailTrim)) throw new AuthError('Credenciais invalidas _ email')
};