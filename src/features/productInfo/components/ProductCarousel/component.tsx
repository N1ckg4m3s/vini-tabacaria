import { Produto } from '@/shered/shered.types'
import * as s from './style'
import ProductCard from '@/features/_shered/components/productCard/component'
import { useRef, useState, useEffect } from 'react'

interface Props {
    tilte: string
    produtos?: Produto[]
}

export const ProductCarousel: React.FC<Props> = ({ tilte, produtos }) => {
    const gridRef = useRef<HTMLDivElement | null>(null)

    const hasItens = !!produtos?.length

    const [disablePrev, setDisablePrev] = useState(true)
    const [disableNext, setDisableNext] = useState(false)

    const updateButtonsState = () => {
        const grid = gridRef.current
        if (!grid) return

        const { scrollLeft, scrollWidth, clientWidth } = grid

        setDisablePrev(scrollLeft <= 0)
        setDisableNext(scrollLeft + clientWidth >= scrollWidth - 1)
    }

    const scrollAmount = () => {
        const grid = gridRef.current
        return grid ? grid.clientWidth : 0
    }

    const handleNext = () => {
        gridRef.current?.scrollBy({
            left: scrollAmount(),
            behavior: 'smooth',
        })
    }

    const handlePrev = () => {
        gridRef.current?.scrollBy({
            left: -scrollAmount(),
            behavior: 'smooth',
        })
    }

    useEffect(() => {
        updateButtonsState()
    }, [produtos])

    return (
        <div>
            <s.RelactionTitle>{tilte}</s.RelactionTitle>

            <s.Carousel>
                {hasItens ? (
                    <>
                        <s.CarouselArrowLeft
                            onClick={handlePrev}
                            disabled={disablePrev}>
                            {'<'}
                        </s.CarouselArrowLeft>

                        <s.CardGrid
                            ref={gridRef}
                            onScroll={updateButtonsState}
                        >
                            {produtos!.map((prod) => (
                                <ProductCard
                                    key={prod.id}
                                    itemData={prod}
                                    small
                                />
                            ))}
                        </s.CardGrid>

                        <s.CarouselArrowRight
                            onClick={handleNext}
                            disabled={disableNext}
                        >
                            {'>'}
                        </s.CarouselArrowRight>
                    </>
                ) : (
                    HasNoItens
                )}
            </s.Carousel>
        </div>
    )
}

const HasNoItens = (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        Não há itens
    </div>
)
