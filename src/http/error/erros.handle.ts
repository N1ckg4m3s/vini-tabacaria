import { AppError } from "./appError";

// ----------
// Sem resposta
// ----------
export class NoResponseError extends AppError {
  constructor(cause?: unknown) {
    super({
      message: 'Sem resposta do servidor',
      code: 'NO_RESPONSE',
      retryable: true,
      cause,
    });
    this.name = 'NoResponseError';
  }
}

// ----------
// Erro generico
// ----------
export class InternalError extends AppError {
  constructor(cause?: unknown) {
    super({
      message: 'Erro interno inesperado',
      code: 'INTERNAL_ERROR',
      retryable: false,
      cause,
    });
    this.name = 'InternalError';
  }
}

// ----------
// Requisição invalida
// ----------
export class BadRequestError extends AppError {
  constructor(message = 'Requisição inválida', cause?: unknown) {
    super({
      message,
      code: 'BAD_REQUEST',
      status: 400,
      retryable: false,
      cause,
    });
    this.name = 'BadRequestError';
  }
}

// ----------
// Não encontrado
// ----------
export class NotFoundError extends AppError {
  constructor(message = 'Recurso não encontrado') {
    super({
      message,
      code: 'NOT_FOUND',
      status: 404,
      retryable: false,
    });
    this.name = 'NotFoundError';
  }
}

// ----------
// Não encontrado
// ----------
export class AuthError extends AppError {
  constructor(message = 'Credenciais inválidas') {
    super({
      message,
      code: 'UNAUTHORIDED',
      status: 401,
      retryable: false,
    });
    this.name = 'Unauthorized';
  }
}
