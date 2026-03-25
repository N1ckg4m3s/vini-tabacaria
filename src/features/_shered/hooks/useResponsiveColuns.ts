'use client'

import { useState, useEffect, useRef } from "react";

interface hookProps {
    CARD_MIN_WIDTH?: number,
    GAP?: number,
    LIMIT_ROWS?: number
}

export const useResponsiveColumns = ({ CARD_MIN_WIDTH = 150, GAP = 16, LIMIT_ROWS = 6 }: hookProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [numeroDeColunas, setNumeroDeColunas] = useState(0);

    const handleResize = (width: number) => {
        if (!containerRef.current) return;

        const columns = Math.floor((width + GAP) / (CARD_MIN_WIDTH + GAP))

        if (columns !== numeroDeColunas) setNumeroDeColunas(columns)
    };

    useEffect(() => {
        if (!containerRef.current) return

        let timeout: number

        const observer = new ResizeObserver(entries => {
            const { width } = entries[0].contentRect

            clearTimeout(timeout)
            timeout = window.setTimeout(() => handleResize(width), 100)
        })

        observer.observe(containerRef.current)
        return () => {
            clearTimeout(timeout)
            observer.disconnect()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const totalItensNaTela = numeroDeColunas * LIMIT_ROWS;

    return { containerRef, numeroDeColunas, totalItensNaTela };
};