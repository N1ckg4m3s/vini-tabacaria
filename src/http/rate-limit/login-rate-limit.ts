type AttemptData = {
    count: number
    firstAttemptAt: number
}

const MAX_ATTEMPTS = 5
const WINDOW_MS = 5 * 60 * 1000

const attemptsByIp = new Map<string, AttemptData>()

/**
 * Verifica se o IP pode tentar login novamente
 * NÃO incrementa tentativa aqui
 */
export function canAttemptLogin(ip: string): boolean {
    const now = Date.now()
    const data = attemptsByIp.get(ip)

    if (!data) return true;

    if (now - data.firstAttemptAt > WINDOW_MS) {
        attemptsByIp.delete(ip)
        return true
    }

    return data.count < MAX_ATTEMPTS
}

/**
 * Registra falha de login
 * Deve ser chamado SOMENTE quando credencial for inválida
 */
export function registerLoginFailure(ip: string): void {
    const now = Date.now()
    const data = attemptsByIp.get(ip)

    if (!data) {
        attemptsByIp.set(ip, {
            count: 1,
            firstAttemptAt: now,
        })
        return
    }

    data.count += 1
}

/**
 * Limpa tentativas após login bem-sucedido
 */
export function clearLoginAttempts(ip: string): void {
    attemptsByIp.delete(ip)
}
