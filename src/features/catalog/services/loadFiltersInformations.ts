import { getFiltersInformations } from "../api/getFiltersInformations";
import { loadFiltersInformaitonsProps } from "../types/ServicesProps";
import { sanitizeFilters } from "./sanitizeFilters";

export const loadFiltersInformaitons: loadFiltersInformaitonsProps = async ({ filtros }) => {
    try {
        const { filtros: retorno } = await getFiltersInformations({
            filtros: sanitizeFilters(filtros),
        })

        return retorno;
    } catch (e) {
        console.error(`[Feature/Catalog/Services/loadCatalog] Error: ${e}`)
        return { itens: [], totalPages: 0 }
    }
}