import { componetsProps, MetaFieldConfig } from "../types/components.types";
import * as s from './componentStyle'
import { TextField } from "./ProductSpecifications/textField";
import { SelectField } from "./ProductSpecifications/selectField";
import { CheckField } from "./ProductSpecifications/checkField";

type props = componetsProps & { fiewdMap: MetaFieldConfig[] }

export const ProductSpecifications: React.FC<props> = ({ draft, onChange, fiewdMap }) => {

    const renderField = (f: MetaFieldConfig) => {
        switch (f.type) {
            case "text": return <TextField key={`${f.key} - ${f.label}`} field={f} draft={draft} onChange={onChange} />
            case "select": return <SelectField key={`${f.key} - ${f.label}`} field={f} draft={draft} onChange={onChange} />
            case "checkboxGroup": return <CheckField key={`${f.key} - ${f.label}`} field={f} draft={draft} onChange={onChange} />
        }
    }

    return (
        <s.section>
            <s.sectionTitle>Especificações de {draft.tipo}</s.sectionTitle>
            <s.grid2> {fiewdMap.map(f => renderField(f))} </s.grid2>
        </s.section>
    )
}