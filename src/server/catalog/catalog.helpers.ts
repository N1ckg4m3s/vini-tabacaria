import { CatalogFilters, Produto } from "@/shered/shered.types";

export const toStringArray = (val: string | number | (string | number)[] | undefined) => {
    if (!val) return [];
    if (typeof val === "string" || typeof val === "number") return [String(val)];
    if (Array.isArray(val)) return val.map(String);
    return [];
};

export const rankProducts = (products: Produto[], filters: CatalogFilters) => {
    return products
        .map(p => {
            let score = 0;

            // Marca
            if (filters.marca?.includes(p.marca)) score += 10;

            // Sabor
            if (Array.isArray(filters.meta?.sabor) && filters.meta.sabor.length) {
                const matchedSabor = filters.meta.sabor.filter(s => {
                    const value = p.metadata?.sabor;
                    if (typeof value === "string") return value.toLowerCase().includes(`${s}`.toLowerCase());
                    if (Array.isArray(value)) return value.some(v => `${v}`.toLowerCase() === `${v}`.toLowerCase());
                    return false;
                });
                score += matchedSabor.length * 5;
            }

            // Intensidade
            if (Array.isArray(filters.meta?.intensidade) && filters.meta.intensidade.length) {
                const matchedInt = filters.meta.intensidade.filter(i => {
                    const value = p.metadata?.intensidade;
                    if (typeof value === "string") return value.toLowerCase().includes(`${i}`.toLowerCase());
                    if (Array.isArray(value)) return value.some(v => `${v}`.toLowerCase() === `${i}`.toLowerCase());
                    return false;
                });
                score += matchedInt.length * 3;
            }

            return { ...p, score };
        })
        .sort((a, b) => b.score - a.score);
};

export const extractUniqueStrings = (produtos: Produto[], extractor: (p: Produto) => unknown): string[] => {
    return [
        ...new Set(
            produtos
                .flatMap(p => {
                    const value = extractor(p);
                    if (!value) return [];
                    if (Array.isArray(value)) return value.map(v => String(v));
                    return [String(value)];
                })
                .map(v => v.toLowerCase().trim())
                .filter(Boolean)
        )
    ];
}
