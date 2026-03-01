import { notification } from '../../types/notification.type'
import * as s from './style'

interface props {
    notification: notification
}

export const NotificationItem: React.FC<props> = ({ notification }) => {
    return (
        <>
            <s.NotificationContainer variety={notification.type} >
                <s.NotificationHeader>
                    <span>{notification.title}</span>
                    <span>{notification.code}</span>
                </s.NotificationHeader>
                <s.NotificationBody>
                    {notification.message}
                </s.NotificationBody>
            </s.NotificationContainer>
        </>
    )
}
