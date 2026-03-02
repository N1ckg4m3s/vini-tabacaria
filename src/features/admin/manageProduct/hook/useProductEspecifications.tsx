import { MetaFieldConfig } from "../types/components.types";

const metaFieldsMap: Record<string, MetaFieldConfig[]> = {
    essencia: [
        { label: "Sabor", key: "sabor", type: "text" },
        { label: "Intensidade", key: "intensidade", type: "checkboxGroup", options: ["Doce", "Gelada", "Quente", "Mentolada", "Citrica"] },
    ],
    acessorio: [
        { label: "Cor", key: "cor", type: "text" },
        { label: "Tamanho", key: "tamanho", type: "select", options: ["Pequeno", "Medio", "Grande"] },
        { label: "Tipo", key: "tipo", type: "select", options: ["Rosh", "Corpo", "Mangueira", "Prato", "Vaso"] },
    ],
    carvao_aluminio: [
        { label: "Tipo", key: "tipo", type: "select", options: ["Kilo", "Meio Kilo", "250g", "Pacote", "Unidae", "Kit"] },
    ],
    outros: [
        { label: "Especificação", key: "especificacao", type: "text" }
    ]
};

export const useProductFieldMap = ({ tipo }: { tipo: string }) => metaFieldsMap[tipo] || []