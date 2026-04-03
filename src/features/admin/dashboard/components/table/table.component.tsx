
import { TableProps } from '../../types/components.types'
import * as s from './style'

export const DashboardTable: React.FC = () => {
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
                <s.tableRow>
                    <s.tableData>##</s.tableData>
                    <s.tableData>0</s.tableData>
                    <s.tableData>0</s.tableData>
                    <s.tableData>0</s.tableData>
                    <s.tableData>0%</s.tableData>
                </s.tableRow>
            </s.tableBody>
        </s.table>
    )
}