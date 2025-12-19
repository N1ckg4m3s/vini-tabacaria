import { getFiltersInformations } from "../api/getFiltersInformations";
import { loadFiltersInformaitonsProps } from "../types/ServicesProps";
import { sanitizeFilters } from "./sanitizeFilters";

export const loadFiltersInformaitons: loadFiltersInformaitonsProps = async ({ filtros }) => {
    const { filtros: retorno } = await getFiltersInformations({
        filtros: sanitizeFilters(filtros),
    })

    return retorno;
}