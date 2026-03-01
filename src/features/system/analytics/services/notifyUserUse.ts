'use client'

import { apiCaller } from "@/features/_shered/services/apiCaller";
import { formatDateBR } from "@/features/_shered/services/formaters/data.formatter";
import { AnalyticsEvent } from "../types/analytics.events";

const storageKey = 'analytics_user_view';

export const notifyUserUse = () => {
    if (typeof window === 'undefined') return;
    const hoje = formatDateBR(new Date());

    const storageValue: string | null = localStorage.getItem(storageKey);
    if (storageValue && storageValue === hoje) return;

    // Atualiza o horário da última notificação
    localStorage.setItem(storageKey, hoje);

    apiCaller({
        method: 'POST',
        url: '/api/analytcs/events',
        body: {
            event: AnalyticsEvent.UserFirstAccessDaily,
            device: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
        }
    })
}