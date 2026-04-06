'use client'
import * as s from './chart.skeleton.style'

export const LineChartSkeleton = () => {
    return (
        <s.chartContainer>
            <s.chartHeader>
                <s.chartHeaderTitle />
            </s.chartHeader>
            <s.chartBody/>
        </s.chartContainer>
    );
};