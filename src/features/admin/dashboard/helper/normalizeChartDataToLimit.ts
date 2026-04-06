export const normalizeChartDataToLimit = (data: number[], limit: number): number[] => {
    const slicedData = data.slice(0, limit);

    if (slicedData.length < limit) {
        const padding = new Array(limit - slicedData.length).fill(0);
        return [...slicedData, ...padding];
    }
    
    return slicedData;
}