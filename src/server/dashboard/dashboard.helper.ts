export const normalizeWeekData = (data: { date: string, value: number }[]) => {
    const result: number[] = [];

    const today = new Date();

    // cria mapa rápido
    const map = new Map(
        data.map(item => [item.date.slice(0, 10), item.value])
    );

    // últimos 7 dias (do mais antigo pro mais recente)
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(today.getDate() - i);

        const key = d.toISOString().slice(0, 10);

        result.push(map.get(key) ?? 0);
    }

    return result;
}


export const get7DaysAgoData = () => {
    const hoje = new Date().toISOString().split('T')[0];
    const seteDiasAtras = new Date();
    seteDiasAtras.setDate(new Date().getDate() - 7)
    const seteDias = seteDiasAtras.toISOString().split('T')[0]

    return { hoje, seteDiasAtras: seteDias };
}