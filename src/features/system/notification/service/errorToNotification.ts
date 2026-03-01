import { AppError } from "@/http/error/appError";
import { notification } from "../types/notification.type";

export function errorToNotification(error: unknown): Omit<notification, 'id'> {
    if (error instanceof AppError) {
        return {
            title: 'Erro',
            message: error.message,
            type: 'Error',
            code: error.code,
        };
    }

    return {
        title: 'Erro',
        message: 'Erro inesperado',
        type: 'Error',
        code: 'UNKNOWN',
    };
}
