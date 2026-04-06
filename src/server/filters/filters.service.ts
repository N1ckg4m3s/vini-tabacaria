import { CatalogFilters } from "@/shered/shered.types";
import { filterRepository } from "./filters.repository";

export class filterService {
    private repo = new filterRepository();

    constructor() { }

    obterDadosParaFiltragem = async (params: { filters: CatalogFilters }) => {
        const { filters } = params

        const produtos = await this.repo.findFilters(filters)

        const grouped = produtos.reduce((
            acc: { [x: string]: { value: any; count: number; }[]; },
            row: { key: string | number; value: any; count: number; }
        ) => {
            if (!acc[row.key]) {
                acc[row.key] = []
            }

            acc[row.key].push({
                value: row.value,
                count: row.count
            })

            return acc
        }, {})

        return grouped
    };
}