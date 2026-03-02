import React from "react";
import { fieldComponentsProps } from "../../types/components.types";
import * as s from '../componentStyle'

export const TextField: React.FC<fieldComponentsProps> = ({ draft, field, onChange }) => {
    return (
        <s.field key={field.key}>
            <s.fieldLabel>{field.label}</s.fieldLabel>
            <s.fieldInput
                value={draft.metadata[field.key] as string || ""}
                onChange={e => onChange({
                    ...draft,
                    metadata: { ...draft.metadata, [field.key]: e.target.value }
                })}
            />
        </s.field>
    )
}