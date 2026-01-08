export type PulseData = {
    todayAcess: number;
    weeklyAccesses: number;
    topDevice: 'Mobile' | 'Desktop';
    topDevicePercentage: number;
}

export type getLast7DaysParams = { hoje: string, seteDiasAtras: string, }
export type getLast7DaysProps = (params: getLast7DaysParams) => Promise<PulseData>;