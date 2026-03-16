'use client'

import { useNotification } from '../../../../providers/notification.provider';
import { NotificationItem } from './notificationItem/component';
import * as s from './style';

export const NotificationOverlay = () => {
    const { notificacoes } = useNotification()

    return (
        <s.Container>
            <s.Stack>
                {[...notificacoes].reverse().map((notifi) =>
                    <NotificationItem
                        notification={notifi}
                        key={notifi.id}
                    />
                )}
            </s.Stack>
        </s.Container>
    );
};
