'use client'

import React, { createContext, useContext, useRef, useState } from 'react'
import { notification } from '@/features/notification/types/notification.type'

const DEFAULT_TTL = 5000

// --------------------
// Context
// --------------------
interface NotificationContextProps {
    notificacoes: notification[]
    adicionarNotificacao: (notfi: Omit<notification, 'id'>) => void
    removerNotificacao: (id: string) => void
    limparNotificacoes: () => void
}

const NotificationContext = createContext<NotificationContextProps>(
    {} as NotificationContextProps
)

// --------------------
// Provider
// --------------------
interface NotificationProviderProps {
    children: React.ReactNode
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
    const [notificacoes, setNotificacoes] = useState<notification[]>([])
    const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

    // ===== Adicionar
    const adicionarNotificacao = (notfi: Omit<notification, 'id'>) => {
        const id = crypto.randomUUID()
        const nova: notification = { ...notfi, id }

        setNotificacoes(prev => [...prev, nova])

        const timeout = setTimeout(() => {
            removerNotificacao(id)
        }, DEFAULT_TTL)

        timers.current.set(id, timeout)
    }

    // ===== Remover uma
    const removerNotificacao = (id: string) => {
        const timer = timers.current.get(id)
        if (timer) clearTimeout(timer)

        timers.current.delete(id)
        setNotificacoes(prev => prev.filter(n => n.id !== id))
    }

    // ===== Limpar todas
    const limparNotificacoes = () => {
        timers.current.forEach(clearTimeout)
        timers.current.clear()
        setNotificacoes([])
    }

    return (
        <NotificationContext.Provider
            value={{
                notificacoes,
                adicionarNotificacao,
                removerNotificacao,
                limparNotificacoes,
            }}
        >
            {children}
        </NotificationContext.Provider>
    )
}

// --------------------
// Hook
// --------------------
export const useNotification = () => useContext(NotificationContext)