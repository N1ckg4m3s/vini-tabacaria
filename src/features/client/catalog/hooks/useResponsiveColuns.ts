'use client'

import { useState, useEffect, useRef } from "react";
import { UseResponsiveColumnsProps } from "../types/HooksProps";

export const useResponsiveColumns: UseResponsiveColumnsProps = ({ numeroDeLinhas = 5, minSize = 200, gapSize = 16 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [numeroDeColunas, setNumeroDeColunas] = useState(0);

    const handleResize = () => {
        if (containerRef.current) {
            const actualWidth = containerRef.current.clientWidth;
            const novoNumeroDeColunas = Math.floor((actualWidth + gapSize) / (minSize + gapSize));

            if (novoNumeroDeColunas !== numeroDeColunas) setNumeroDeColunas(novoNumeroDeColunas)
        }
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalItensNaTela = numeroDeColunas * numeroDeLinhas;
    return { containerRef, numeroDeColunas, totalItensNaTela };
}
