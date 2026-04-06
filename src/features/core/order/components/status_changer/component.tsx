'use client'

import * as s from './style'
import { OrderStatus } from '@/server/order/order.types'
import { CSSProperties } from 'styled-components'
import { disableStatus } from '../../service/disableStatus'
import { useChangeState } from '../../hook/useChangeStatus'
import { LoadingOverlay } from '@/features/_shered/components/loading/component'
import { useRouter } from 'next/navigation'

interface props {
    actualStatus: OrderStatus,
    orderId: string
}

const styledDiv: CSSProperties = {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px 20px 0px 20px',
}

export const OrderStatusChanger: React.FC<props> = ({ actualStatus, orderId }) => {
    const router = useRouter()
    const { loading, changeToStatus } = useChangeState(orderId)

    const disabledStatus = disableStatus(actualStatus)

    const handleChange = async (status: OrderStatus) => {
        await changeToStatus(status)
        router.refresh()
    }

    const renderButton = (status: OrderStatus) => (
        <s.statusButton
            status={status}
            disabled={disabledStatus[status]}
            onClick={() => handleChange(status)}
        >
            {status}
        </s.statusButton>
    )

    return (
        <div style={styledDiv}>
            {loading && <LoadingOverlay />}
            <s.statusContainer>
                {renderButton(OrderStatus.HANDLING)}

                {renderButton(OrderStatus.COMPLETED)}

                {renderButton(OrderStatus.CANCELED)}
            </s.statusContainer>
        </div>
    )
}