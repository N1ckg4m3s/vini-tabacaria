import { Produto } from "@/shered/shered.types"

// ------------------------
// tipagem dos componentes
// ------------------------
export type componetsProps = {
    draft: Produto,
    onChange: (p: Produto) => void
}

// ------------------------
// tipagem dos input field
// ------------------------
export type FieldType = "text" | "select" | "checkboxGroup";

export interface MetaFieldConfig {
    label: string;
    key: string;
    type: FieldType;
    options?: string[]; // apenas para select e checkboxGroup
}

// ------------------------
// tipagem dos componentes de fiewds
// ------------------------
export type fieldComponentsProps = {
    field: MetaFieldConfig,
    draft: Produto,
    onChange: (p: Produto) => void
}