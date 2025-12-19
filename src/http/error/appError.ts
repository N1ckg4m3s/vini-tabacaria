export class AppError extends Error {
    public readonly code: string;
    public readonly status?: number;
    public readonly retryable: boolean;
    public readonly cause?: unknown;

    constructor({
        message,
        code,
        status,
        retryable = false,
        cause,
    }: {
        message: string;
        code: string;
        status?: number;
        retryable?: boolean;
        cause?: unknown;
    }) {
        super(message);
        this.name = 'AppError';
        this.code = code;
        this.status = status;
        this.retryable = retryable;
        this.cause = cause;
    }
}
