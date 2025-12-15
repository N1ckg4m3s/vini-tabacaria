import * as s from './style'
import { CatalogFilters } from "@/shered/shered.types"
import { FilterActions } from "../../types/HooksProps"

type FilterSectionRendererProps = {
    sectionKey: string
    values: any
    applied: CatalogFilters
    actions: FilterActions
}

export const renderers: Record<string, React.FC<FilterSectionRendererProps>> = {
    marca: ({ values, applied, actions }) => (
        <s.FilterSection>
            <s.LabelText>Marca</s.LabelText>
            {values.map((m: string) => (
                <s.CheckboxWrapper key={m}>
                    <s.Checkbox
                        checked={applied.marca?.includes(m) ?? false}
                        onChange={() => actions.toggleArrayFilter('marca', m)}
                    />
                    {m}
                </s.CheckboxWrapper>
            ))}
        </s.FilterSection>
    ),

    essencia: ({ values, applied, actions }) => (
        <s.FilterSection>
            <s.LabelText>Essência</s.LabelText>

            {values.sabor && (
                <>
                    <h5>Sabor</h5>
                    {values.sabor.map((sabor: string) => (
                        <s.CheckboxWrapper key={sabor}>
                            <s.Checkbox
                                checked={applied.meta?.sabor?.includes(sabor) ?? false}
                                onChange={() => actions.toggleMetaFilter('sabor', sabor)}
                            />
                            {sabor}
                        </s.CheckboxWrapper>
                    ))}
                </>
            )}

            {values.intensidade && (
                <>
                    <h5>intensidade</h5>
                    {values.intensidade.map((inten: string) => (
                        <s.CheckboxWrapper key={inten}>
                            <s.Checkbox
                                checked={applied.meta?.intensidade?.includes(inten) ?? false}
                                onChange={() => actions.toggleMetaFilter('intensidade', inten)}
                            />
                            {inten}
                        </s.CheckboxWrapper>
                    ))}
                </>
            )}
        </s.FilterSection>
    ),

    acessorio: ({ values, applied, actions }) => (
        <s.FilterSection>
            <s.LabelText>Acessorio</s.LabelText>

            {values.cor && (
                <>
                    <h5>Cor</h5>
                    {values.cor.map((cor: string) => (
                        <s.CheckboxWrapper key={cor}>
                            <s.Checkbox
                                checked={applied.meta?.cor?.includes(cor) ?? false}
                                onChange={() => actions.toggleMetaFilter('cor', cor)}
                            />
                            {cor}
                        </s.CheckboxWrapper>
                    ))}
                </>
            )}

            {values.tamanho && (
                <>
                    <h5>tamanho</h5>
                    {values.tamanho.map((tamanho: string) => (
                        <s.CheckboxWrapper key={tamanho}>
                            <s.Checkbox
                                checked={applied.meta?.tamanho?.includes(tamanho) ?? false}
                                onChange={() => actions.toggleMetaFilter('tamanho', tamanho)}
                            />
                            {tamanho}
                        </s.CheckboxWrapper>
                    ))}
                </>
            )}

            {values.tipo && (
                <>
                    <h5>tipo</h5>
                    {values.tipo.map((tipo: string) => (
                        <s.CheckboxWrapper key={tipo}>
                            <s.Checkbox
                                checked={applied.meta?.tipo?.includes(tipo) ?? false}
                                onChange={() => actions.toggleMetaFilter('tipo', tipo)}
                            />
                            {tipo}
                        </s.CheckboxWrapper>
                    ))}
                </>
            )}

        </s.FilterSection>
    ),

    tipo: ({ values, applied, actions }) => (
        <s.FilterSection>
            <s.LabelText>Tipo</s.LabelText>
            {values.map((m: string) => (
                <s.CheckboxWrapper key={m}>
                    <s.Checkbox
                        checked={applied.tipo?.includes(m) ?? false}
                        onChange={() => actions.toggleArrayFilter('tipo', m)}
                    />
                    {m}
                </s.CheckboxWrapper>
            ))}
        </s.FilterSection>
    ),

    carvao_aluminio: ({ values, applied, actions }) => (
        <s.FilterSection>
            <s.LabelText>Carvão / Aluminio</s.LabelText>

            {values.pacote && (
                <>
                    <h5>pacote</h5>
                    {values.pacote.map((pacote: string) => (
                        <s.CheckboxWrapper key={pacote}>
                            <s.Checkbox
                                checked={applied.meta?.pacote?.includes(pacote) ?? false}
                                onChange={() => actions.toggleMetaFilter('pacote', pacote)}
                            />
                            {pacote}
                        </s.CheckboxWrapper>
                    ))}
                </>
            )}
        </s.FilterSection>
    ),

    preco: ({ values }) => (
        <s.FilterSection>
            <s.LabelText>Preço</s.LabelText>
            <span>{values.min} – {values.max}</span>
        </s.FilterSection>
    )
}
