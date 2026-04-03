import * as s from './funil.style'

interface props {
    views: number,
    adds: number,
    buys: number,
}

export const FunilComponent: React.FC<props> = ({ views, adds, buys }) => {
    const calcularPorcentagem = (de: number, para: number) => {
        const porcent = para / de
        return Math.floor(porcent * 100)
    }

    return (
        <>
            <s.funelContainer>
                <s.stepContainer>
                    <s.stepLabel>Views</s.stepLabel>
                    <s.stepValue>{views}</s.stepValue>
                </s.stepContainer>

                <s.flowContainer>
                    <s.flowArrow >—</s.flowArrow>
                    <s.flowPorcent>{calcularPorcentagem(views, adds)}%</s.flowPorcent>
                    <s.flowArrow >→</s.flowArrow>
                </s.flowContainer>

                <s.stepContainer>
                    <s.stepLabel>Adds</s.stepLabel>
                    <s.stepValue>{adds}</s.stepValue>
                </s.stepContainer>

                <s.flowContainer>
                    <s.flowArrow >—</s.flowArrow>
                    <s.flowPorcent >{calcularPorcentagem(adds, buys)}%</s.flowPorcent>
                    <s.flowArrow >→</s.flowArrow>
                </s.flowContainer>

                <s.stepContainer>
                    <s.stepLabel>Compras</s.stepLabel>
                    <s.stepValue>{buys}</s.stepValue>
                </s.stepContainer>
            </s.funelContainer>

            <s.funelResumeContainer>
                <span>Total convertido</span>
                <s.resumeValue>{calcularPorcentagem(views, buys)}%</s.resumeValue>
            </s.funelResumeContainer>
        </>
    )
}