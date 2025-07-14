interface Props {
    paginaAtual: number;
    numeroDePaginas: number;
}

export const getPaginasVisiveis = ({ paginaAtual, numeroDePaginas }: Props): (number | 'ellipsis')[] => {
    if (numeroDePaginas <= 1) return [];

    if (numeroDePaginas <= 5) {
        return Array.from({ length: numeroDePaginas }, (_, i) => i + 1);
    }

    const resultado: (number | 'ellipsis')[] = [1];

    const range = (start: number, end: number) =>
        Array.from({ length: end - start + 1 }, (_, i) => start + i);

    const leftGap = paginaAtual > 4;
    const rightGap = paginaAtual <= numeroDePaginas - 3;

    const middleStart = Math.max(2, paginaAtual - 1);
    const middleEnd = Math.min(numeroDePaginas - 1, paginaAtual + 1);

    if (leftGap) resultado.push('ellipsis');

    resultado.push(...range(middleStart, middleEnd));

    if (rightGap) resultado.push('ellipsis');

    resultado.push(numeroDePaginas);

    return resultado;
};
