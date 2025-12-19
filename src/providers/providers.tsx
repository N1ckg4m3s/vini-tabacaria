'use client'

import React, { ReactNode } from 'react'
import { CartProvider } from './cart.provider'
import { NotificationProvider } from './notification.provider'

interface props {
    children: ReactNode
}

export const ProvidersGroup: React.FC<props> = ({ children }) => {
    return (
        <>
            <NotificationProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </NotificationProvider>
        </>
    )
}