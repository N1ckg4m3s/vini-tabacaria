import { useEffect, useState } from 'react'
import * as s from './style'

interface props {
    quantidade: number
    onDiminuir: () => void
    onAumentar: () => void
    onDefinir: (value: number) => void
}

export const QuantityControl: React.FC<props> = ({ quantidade, onDefinir, onDiminuir, onAumentar }) => {
    const [draftQty, setDraftQty] = useState<string>(String(quantidade))

    useEffect(() => {
        setDraftQty(String(quantidade))
    }, [quantidade])


    return (
        <s.QuantityControl>
            <s.QuantityButton
                onClick={() => onDiminuir()}
            >  {quantidade > 1 ? '-' : 'x'} </s.QuantityButton>

            <s.QuantityInput
                type="text"
                pattern='[0-9]*'
                inputMode='numeric'
                value={draftQty}
                min={1}
                onChange={e => setDraftQty(e.target.value.replace(/[^\d]/g, ''))}
                onBlur={() => {
                    if (draftQty === '') {
                        setDraftQty(String(quantidade))
                        return;
                    }

                    const value = Math.floor(Number(draftQty))

                    if (value < 1) {
                        setDraftQty(String(quantidade))
                        return
                    }

                    onDefinir(value)
                }}
            />

            <s.QuantityButton
                onClick={() => onAumentar()}
            > + </s.QuantityButton>
        </s.QuantityControl >
    )
}