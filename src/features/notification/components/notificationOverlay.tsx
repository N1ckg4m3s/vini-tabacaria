'use client'

import { NotificationItem } from './notificationItem/component';
import * as s from './style';
import { useNotification } from '@/providers/notification.provider';

export const NotificationOverlay = () => {
    const { notificacoes } = useNotification()

    return (
        <s.Container>
            <s.Stack>
                {[...notificacoes].reverse().map((notifi, i) =>
                    <NotificationItem
                        notification={notifi}
                        key={notifi.id}
                    />
                )}
            </s.Stack>
        </s.Container>
    );
};
