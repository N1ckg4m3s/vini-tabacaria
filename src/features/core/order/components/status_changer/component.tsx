'use client'

import * as s from './style'
import { OrderStatus, statusMap } from '../../../../../server/order/order.types'
import { CSSProperties } from 'styled-components'
import { disableStatus } from '../../service/disableStatus'
import { useChangeState } from '../../hook/useChangeStatus'
import { LoadingOverlay } from '../../../../_shered/components/loading/component'

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
    const { loading, changeToStatus } = useChangeState(orderId)

    const disabledStatus = disableStatus(actualStatus)

    const renderButton = (status: OrderStatus) => {
        return (
            <s.statusButton
                status={status}
                disabled={disabledStatus[status]}
                onClick={() => changeToStatus(status)}
            >
                {statusMap[status]}
            </s.statusButton>
        )
    }

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