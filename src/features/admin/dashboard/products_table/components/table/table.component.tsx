'use client'

import { productConversionData } from '@/shered/shered.types'
import * as s from './style'

interface DashboardTableProps {
    data: productConversionData[]
}

export const DashboardTable: React.FC<DashboardTableProps> = ({ data }) => {
    return (
        <s.table>
            <s.tableHead>
                <s.tableRow>
                    <s.tableData>Produto</s.tableData>
                    <s.tableData>Views</s.tableData>
                    <s.tableData>Adds</s.tableData>
                    <s.tableData>Compras</s.tableData>
                    <s.tableData>Conversão</s.tableData>
                </s.tableRow>
            </s.tableHead>

            <s.tableBody>
                {data.map((item, index) => (
                    <s.tableRow key={index}>
                        <s.tableData>{item.product_label}</s.tableData>
                        <s.tableData>{item.views}</s.tableData>
                        <s.tableData>{item.adds}</s.tableData>
                        <s.tableData>{item.orders}</s.tableData>
                        <s.tableData>{item.conversion.toFixed(2)}%</s.tableData>
                    </s.tableRow>
                ))}
            </s.tableBody>
        </s.table>
    )
}