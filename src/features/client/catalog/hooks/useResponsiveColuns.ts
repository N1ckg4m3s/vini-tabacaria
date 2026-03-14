'use client'

import { useState, useEffect, useRef } from "react";

export const useResponsiveColumns = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [numeroDeColunas, setNumeroDeColunas] = useState(0);
    const [numeroDeRows, setNumeroDeRows] = useState(0);

    const handleResize = (width: number, height: number) => {
        if (!containerRef.current) return;

        const CARD_MIN_WIDTH = 150
        const CARD_MIN_HEIGHT = 192

        const GAP = 16

        const columns = Math.floor((width + GAP) / (CARD_MIN_WIDTH + GAP))
        const rows = Math.floor((height + GAP) / (CARD_MIN_HEIGHT + GAP))

        const clampedRow = Math.min(rows, 6)

        if (columns !== numeroDeColunas) setNumeroDeColunas(columns)
        if (clampedRow !== numeroDeRows && clampedRow <= 6) setNumeroDeRows(clampedRow)
    };

    useEffect(() => {
        if (!containerRef.current) return

        let timeout: number

        const observer = new ResizeObserver(entries => {
            const { width, height } = entries[0].contentRect

            clearTimeout(timeout)
            timeout = window.setTimeout(() => handleResize(width, height), 100)
        })

        observer.observe(containerRef.current)
        return () => {
            clearTimeout(timeout)
            observer.disconnect()
        }
    }, [])

    const totalItensNaTela = numeroDeColunas * numeroDeRows;

    return { containerRef, numeroDeColunas, totalItensNaTela };
};