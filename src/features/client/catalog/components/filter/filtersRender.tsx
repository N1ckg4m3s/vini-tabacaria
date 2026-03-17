import { FilterSource } from '../../../../../shered/shered.types'
import { FilterActions } from '../../types/HooksProps'
import * as s from './style'

type FilterSectionRendererProps = {
    field: string
    values: FilterSource[]
    actions: FilterActions
}

export const RederizarSessoes: React.FC<FilterSectionRendererProps> = ({ field, values, actions }) => {
    return (
        <s.FilterSection>
            <s.LabelText>{field}</s.LabelText>
            {values.map(m => (
                <s.CheckboxWrapper key={m.value}>
                    <s.Checkbox
                        checked={actions.verifyToggle(field, m.value)}
                        onChange={() => actions.toggleFilter(field, m.value)}
                    />
                    {m.value}
                </s.CheckboxWrapper>
            ))}
        </s.FilterSection>
    )
}
