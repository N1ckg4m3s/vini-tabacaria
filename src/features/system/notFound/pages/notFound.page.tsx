'use client'

import { useEffect, useRef } from "react";
import * as s from './style'
import { generateTextMask } from "../service/generateTextMask";
import { useRouter } from "next/navigation";
import { SmokeMachine } from "../../../../lib/smoke/smoke";

export const NotFoundPage = () => {
    const router = useRouter()
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const bufferCanvas = document.createElement('canvas');
        const bufferCtx = bufferCanvas.getContext('2d')!;

        const smoke = SmokeMachine(bufferCtx, [127, 127, 127]);

        smoke.setPreDrawCallback(() => generateTextMask({ bufferCanvas, canvas, ctx }))

        smoke.start();

        const interval = setInterval(() => {
            smoke.addSmoke(
                canvas.width,
                canvas.height / 2,
                2,
                {
                    maxVy: 0.1,
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
                <s.Menssage>Pagina não encontrada</s.Menssage>
                <s.BotaoVoltar onClick={handleBackClick}>Voltar</s.BotaoVoltar>
            </s.errorContainer>
        </s.pageContainer >
    )
}