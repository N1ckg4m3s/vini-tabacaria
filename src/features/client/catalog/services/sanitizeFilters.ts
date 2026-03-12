import { SelectedFilters } from "../types/HooksProps";

export const serializeFilters = (filters: SelectedFilters) =>
    Object.fromEntries(
        Object.entries(filters).map(([k, v]) => [k, Array.from(v)])
    )