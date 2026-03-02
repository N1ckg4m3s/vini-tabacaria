import React from "react";
import { fieldComponentsProps } from "../../types/components.types";
import * as s from '../componentStyle'

export const SelectField: React.FC<fieldComponentsProps> = ({ draft, field, onChange }) => {
    return (
        <s.field key={field.key}>
            <s.fieldLabel>{field.label}</s.fieldLabel>
            <s.fieldSelect
                value={draft.metadata[field.key] as string || ""}
                onChange={e => onChange({
                    ...draft,
                    metadata: { ...draft.metadata, [field.key]: e.target.value }
                })}
            >
                <option>-Selecione-</option>
                {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
            </s.fieldSelect>
        </s.field>
    )
}