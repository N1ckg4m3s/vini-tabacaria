type ApiCallerProps = {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    headers?: Record<string, string>;
};

/**
 * Função para centralizar a logica de chamadas para o backend, mantendo o Headers e cookies
 * 
 * @param {ApiCallerProps} = {
 * - url: string;
 * - method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
 * - body?: any;
 * - headers?: Record<string, string>;
 * } 
 * @returns 
*/
export async function apiCaller({ url, method = 'GET', body, headers = {} }: ApiCallerProps) {
    try {
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            credentials: 'include', // envia cookies como o HttpOnly
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);

        if (!response.ok) {
            if (response.status === 401 && typeof window !== 'undefined') {
                window.location.href = '/login';
                return;
            }

            const errorText = await response.text();
            throw new Error(`API error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json().catch(() => null);

        return data;
    } catch (error) {
        throw error;
    }
}