
import { TableProps } from '../../types/components.types'
import * as s from './style'

export const DashboardTable: React.FC<TableProps> = ({ title, items }) => {
    return (
        <s.cardContainer>
            <s.cardTitle>{title}</s.cardTitle>
            <s.tableList>
                {items.map((item, index) => (
                    <s.tableRow key={index}>
                        <span>{item.name}</span>
                        <s.span variant={item.variant}>{item.value}</s.span>
                    </s.tableRow>
                ))}
            </s.tableList>
        </s.cardContainer>
    )
}