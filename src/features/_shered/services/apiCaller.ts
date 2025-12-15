type ApiCallerProps = {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    headers?: Record<string, string>;
    params?: Record<string, string | number | boolean>;
};

/**
 * Função focada em gerar a Url para a chamada.
 * 
 * @param {string} Url - caminho da api
 * @param {Record<string, string | number | boolean>?} params - parametros 
 * 
 * @returns {string} Url final
*/
const buildUrl = (
    url: string,
    params?: Record<string, string | number | boolean>
): string => {
    if (!params) return url;

    const queryString = new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
        }, {} as Record<string, string>)
    ).toString();

    return url.includes('?') ? `${url}&${queryString}` : `${url}?${queryString}`;
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
export async function apiCaller({ url, method = 'GET', body, headers = {}, params }: ApiCallerProps) {
    try {
        /* Gerar a url com os paramstros */
        const finalUrl: string = buildUrl(url, params);

        /* configurações da Requisição */
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            /* Adicionando o corpo na requisição */
            // body: body ?? {},
            credentials: 'include', // envia cookies como o HttpOnly
        };

        if (body) {
            options.body = body;
        }

        /* Chamar a API com parametros e configurações */
        const response = await fetch(finalUrl, options);

        /* Retornar erro */
        if (!response.ok) {
            const errorText = await response.text();

            // Redireciona para login se for 401
            if (response.status === 401) {
                if (typeof window !== 'undefined') {
                    // window.location.href = '/admin-login';
                }
            }

            const error = new Error(`API error: ${response.status} ${response.statusText} - ${errorText}`);
            (error as any).status = response.status;
            throw error;
        }


        /* Retornar data */
        const data = await response.json().catch(() => null);

        return data;
    } catch (error) {
        throw error;
    }
}