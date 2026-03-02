import React from "react";
import { fieldComponentsProps } from "../../types/components.types";
import * as s from '../componentStyle'

export const CheckField: React.FC<fieldComponentsProps> = ({ draft, field, onChange }) => {
    return (
        <s.field key={field.key}>
            <s.fieldLabel>{field.label}</s.fieldLabel>
            <s.checkboxGroup>
                {field.options?.map(opt => (
                    <s.checkboxItem key={opt}>
                        <s.checkboxInput
                            checked={(draft.metadata[field.key] as string[] || []).includes(opt)}
                            onChange={e => {
                                const current = draft.metadata[field.key] as string[] || [];
                                const next = e.target.checked
                                    ? [...current, opt]
                                    : current.filter(v => v !== opt);
                                onChange({ ...draft, metadata: { ...draft.metadata, [field.key]: next } });
                            }}
                        />
                        {opt}
                    </s.checkboxItem>
                ))}
            </s.checkboxGroup>
        </s.field>
    )
}