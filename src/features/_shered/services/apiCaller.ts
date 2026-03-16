import { AuthError } from "@supabase/supabase-js";
import { BadRequestError, InternalError, NotFoundError } from "../../../http/error/erros.handle";
import { AppError } from "../../../http/error/appError";

type ApiCallerProps = {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: Record<string, any>;
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
    /* Gerar a url com os paramstros */
    const finalUrl: string = buildUrl(url, params);

    /* configurações da Requisição */
    const options: RequestInit = {
        method,
        headers: {},
        credentials: 'include',
    };

    if (body instanceof FormData) {
        options.headers = { ...headers }
        options.body = body
    } else if (body !== undefined) {
        options.body = JSON.stringify(body)
        options.headers = { ...headers, 'Content-Type': 'application/json' }
    }

    /* Chamar a API com parametros e configurações */
    const response = await fetch(finalUrl, options);

    /* Retornar data */
    let data = null;
    try {
        data = await response.json();
    } catch { }

    /* Retornar erro */
    if (!response.ok) {
        switch (response.status) {
            case 400:
                throw new BadRequestError(data?.message);
            case 401:
                throw new AuthError(data?.message);
            case 404:
                throw new NotFoundError(data?.message);
            case 429:
                throw new AppError({
                    message: data?.message ?? 'Muitas tentativas',
                    code: 'RATE_LIMIT',
                    status: 429,
                    retryable: true,
                });
            default:
                throw new InternalError(data);
        }
    }

    return data;
}