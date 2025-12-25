export const validateSenha = (senha: string) => {
    if (!senha || senha.trim().length === 0) {
        throw new Error('Senha obrigatória')
    }
}