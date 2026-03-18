interface props {
    bufferCanvas: HTMLCanvasElement,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    svgImageRef: HTMLImageElement
}

export const generateTextMask = ({ bufferCanvas, canvas, ctx, svgImageRef }: props) => {
    if (!svgImageRef) return; // garante que a imagem foi carregada

    // centraliza o SVG
    const width = 299 / 2;
    const height = 257 / 2;
    const x = (canvas.width - width) / 2;
    const y = (canvas.height - height) / 2;

    // desenha SVG (isso vai ser a máscara)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(svgImageRef, x, y, width, height);

    // aplica máscara
    ctx.globalCompositeOperation = 'source-in';
    ctx.drawImage(bufferCanvas, 0, 0);

    // reseta
    ctx.globalCompositeOperation = 'source-over';
};
