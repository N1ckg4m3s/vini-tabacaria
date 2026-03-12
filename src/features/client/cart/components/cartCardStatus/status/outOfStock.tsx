import * as s from '../style'

interface props {
    remove: () => void
}

export const OutOfStock: React.FC<props> = ({ remove }) => {
    return (
        <>
            <s.Title>
                <s.Strong>Puts...</s.Strong> esse produto acabou
            </s.Title>

            <s.Container>
                <s.ButtonRemove onClick={remove}>
                    Remover
                </s.ButtonRemove>
            </s.Container>
        </>
    )
}