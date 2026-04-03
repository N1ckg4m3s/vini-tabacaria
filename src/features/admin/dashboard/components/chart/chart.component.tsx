import * as s from './style'
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface LineChartProps {
    title: string;
    labels: string[];
    data: number[];
}

export const LineChartComponent: React.FC<LineChartProps> = ({ title, labels, data }) => {
    return (
        <Line data={{
            labels,
            datasets: [
                {
                    label: title,
                    data,
                    borderColor: 'rgba(75,192,192,1)',
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    tension: 0.4,
                },
            ],
        }} />
    );
};