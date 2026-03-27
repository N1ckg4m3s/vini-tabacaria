'use client'

import { useRouter } from "next/navigation";

interface props {
    limit: number,
    actualTab: 'processing' | 'finished'
}

export const useChangeTab = ({ limit, actualTab }: props) => {
    const router = useRouter();

    const changeToTab = (tab: 'processing' | 'finished') => {
        if (tab === actualTab) return;

        router.push(`/admin/order?tab=${tab}&limit=${limit}&page=1`)
    }

    return { changeToTab }
}