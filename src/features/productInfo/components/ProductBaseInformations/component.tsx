import { Produto } from '@/shered/shered.types'
import * as s from './style'
import { formateText } from '@/features/_shered/hooks/text.formater'
import { formatePrice } from '@/features/_shered/hooks/price.formater'
import { formatMetadataValue } from '@/features/_shered/hooks/meta.formater'
import { ProductClientActions } from '../ProductClientActions/component'

interface Props {
    produto?: Produto
}

export const ProductBaseInformations: React.FC<Props> = ({ produto }) => {
    return (<>
        <s.ProdutoContainer>
            <s.ProdutoImagem>
                <s.ImagemWarper>
                    <s.ImagemPlaceHolder> Imagem do produto </s.ImagemPlaceHolder>
                </s.ImagemWarper>
            </s.ProdutoImagem>
            <s.ProductInfoContainer>
                <header>
                    <s.ProductName>{formateText(produto?.nome)}</s.ProductName>
                    <s.ProductMarca>{formateText(produto?.marca)}</s.ProductMarca>
                </header>

                <s.ProductPrice>{formatePrice(produto?.valor)}</s.ProductPrice>

                <s.ProductEspecification>
                    <s.TitleH2>Especificações</s.TitleH2>
                    <s.EspecGrid>
                        {Object.entries(produto?.metadata || {}).map(([title, values]) => {
                            if (Array.isArray(values) && values.length === 0) return null

                            return (
                                <s.EspecItem key={title}>
                                    <s.EspecItemLabel>{title}</s.EspecItemLabel>
                                    <s.EspecItemValue>{formatMetadataValue(values)}</s.EspecItemValue>
                                </s.EspecItem>
                            )
                        })}
                    </s.EspecGrid>
                </s.ProductEspecification>

                <ProductClientActions produto={produto} />

            </s.ProductInfoContainer>
        </s.ProdutoContainer>
    </>)
}