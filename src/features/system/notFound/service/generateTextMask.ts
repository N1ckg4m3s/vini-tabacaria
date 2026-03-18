interface props {
    bufferCanvas: HTMLCanvasElement,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
}

export const generateTextMask = ({ bufferCanvas, canvas, ctx }: props) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. desenha o texto (máscara)
    ctx.font = 'bold 160px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'white';
    ctx.filter = 'blur(0.5px)';
    ctx.fillText('404', canvas.width / 2 + 2, canvas.height / 2);

    // 2. aplica máscara
    ctx.globalCompositeOperation = 'source-in';

    // 3. desenha a fumaça do buffer
    ctx.drawImage(bufferCanvas, 0, 0);

    // 4. reseta
    ctx.globalCompositeOperation = 'source-over';
}