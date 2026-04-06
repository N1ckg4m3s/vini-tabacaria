'use client'

import * as s from './style'

export const TableSkeleton: React.FC = () => {
    return (
        <s.table>
            <s.tableHead>
                <s.tableRow />
            </s.tableHead>

            <div>
                <s.tableRow delay={0.1} />
                <s.tableRow delay={0.2} />
                <s.tableRow delay={0.4} width={75} />
            </div>
        </s.table>
    )
}