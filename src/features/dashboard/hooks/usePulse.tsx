import { usePulseProps } from "../types/hooks.types";
import { useEffect, useState } from "react";
import { PulsoDeUso } from "../types/api.types";
import { obterPulsoDeUso } from "../api/obterPulsoDeUso";

export const usePulse: usePulseProps = () => {
    const [pulseData, setPulseData] = useState<PulsoDeUso>();

    useEffect(() => {
        const fetchPulseData = async () => {
            const data = await obterPulsoDeUso();
            setPulseData(data);
        }
        fetchPulseData();
    }, [])

    return pulseData || {
        todayAcess: null,
        weeklyAccesses: null,
        topDevice: null,
        topDevicePercentage: null,
    };
}