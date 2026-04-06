'use client'

import { useEffect, useRef } from "react";
import * as s from './style'
import { generateTextMask } from "../service/generateTextMask";
import { useRouter } from "next/navigation";
import { SmokeMachine } from "@/lib/smoke/smoke";

export const UnderConstructPage = () => {
    const router = useRouter()
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const svgImageRef = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        const img = new Image();
        img.src = '/assets/UnderConstruct.svg';
        svgImageRef.current = img;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const bufferCanvas = document.createElement('canvas');
        const bufferCtx = bufferCanvas.getContext('2d')!;

        const smoke = SmokeMachine(bufferCtx, [200, 200, 200]);

        smoke.setPreDrawCallback(() => generateTextMask({ bufferCanvas, canvas, ctx, svgImageRef: svgImageRef.current || img }))

        smoke.start();

        const interval = setInterval(() => {
            smoke.addSmoke(
                canvas.width,
                canvas.height / 2,
                2,
                {
                    maxVy: 0.25,
                    maxVx: -.25,
                    maxLifetime: 10,
                }
            );
        }, 100);

        return () => {
            clearInterval(interval);
            smoke.stop?.(); // se existir
        };
    }, []);

    const handleBackClick = () => router.back()

    return (
        <s.pageContainer>
            <s.errorContainer>
                <s.Canvas ref={canvasRef} />
                <s.Menssage>Pagina em construção</s.Menssage>
                <s.BotaoVoltar onClick={handleBackClick}>Voltar</s.BotaoVoltar>
            </s.errorContainer>
        </s.pageContainer >
    )
}